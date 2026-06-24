import React, { useEffect, useState } from 'react'
import { useCallback } from 'react';
import { dummyAttendanceData } from '../assets/assets';
import Loading from '../components/Loading';
import CheckInButton from '../components/attendance/CheckInButton';

const Attendance = () => {
  const [history , setHistory]=useState([]);
  const [loading,setLoading]=useState(true);
  const [isdeleted ,setIsDeleted]=useState(false);

const fetchData = useCallback(async () => {
  setHistory(dummyAttendanceData);

  setTimeout(() => {
    setLoading(false);
  }, 1000);
}, []);

 useEffect(() => {
  fetchData();
}, [fetchData]); 

if(loading) return <Loading/>
const today=new Date()
today.setHours(0,0,0,0);
const todayRecord=history.find((r)=> new Date(r.date).toDateString() === today.toDateString());

  return (
    <div className="animate-fade-in">
      <div>
     <h1 className="text-3xl font-medium text-slate-900">
      Attendance
    </h1>
  <p className="text-slate-500 mt-1">
    Track your work hours and daily check-ins
  </p>
      </div>
      {isdeleted ?(
       <div className='m-8 p-6 border border-rose-400 rounded-2xl text-center'>
        <p className='text-rose-600'>
         you can no longer clocked in our out bacause your employee records has been marked or deleted
        </p>
       </div>

      ):(
       <div>
       <CheckInButton todayRecord={todayRecord} onAction={fetchData}/>
      </div>
      )

      }
</div>
  )
}

export default Attendance