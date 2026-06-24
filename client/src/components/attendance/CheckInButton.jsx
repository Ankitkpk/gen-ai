import { LoaderIcon, LogIn,LogOut } from 'lucide-react';
import React, { useState } from 'react'

const CheckInButton = ({todayRecord,onAction}) => {
  const [loading, setLoading]=useState(false);

  const handleAttendance=(()=>{
    setLoading(true);
    setTimeout(()=>{
     setLoading(false);
     onAction()
    },1000)
})

if(todayRecord?.checkOut){
  return(
    <div className='flex flex-col items-center justify-center p-8 bg-slate-80 rounded-2xl border  border-slate-200'>
      <h3 className=' text-lg fond-bold text-slate-900'>
        work day completed
      </h3>
  <p className='text-sm text-slate-300'>Great job see you tommorow</p>
    </div>
  )
}
const hasCheckedOut = !!todayRecord?.checkOut;

return (
<div className="absolute bottom-4 right-4 z-10">
  <button
    onClick={handleAttendance}
    disabled={loading}
    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-white shadow-md transition-all duration-300 hover:scale-105 ${
      hasCheckedOut
        ? "bg-gradient-to-r from-slate-700 to-slate-900"
        : "bg-gradient-to-r from-indigo-600 to-indigo-700"
    }`}
  >
    {loading ? (
      <LoaderIcon className="size-5 animate-spin shrink-0" />
    ) : hasCheckedOut ? (
      <LogIn className="size-5 shrink-0" />
    ) : (
      <LogOut className="size-5 shrink-0" />
    )}

    <div className="flex flex-col text-left">
      <h2 className="text-sm font-semibold leading-none">
        {loading
          ? "Processing..."
          : hasCheckedOut
          ? "Clock Out"
          : "Clock In"}
      </h2>

      <p className="text-xs text-white/80 mt-1">
        {hasCheckedOut
          ? "Click to end your work shift"
          : "Start your workday"}
      </p>
    </div>
  </button>
</div>
);}

export default CheckInButton