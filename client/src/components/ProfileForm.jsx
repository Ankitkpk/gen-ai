import { User } from 'lucide-react';
import React, { useState } from 'react'

const ProfileForm = ({initialData,onSuccess}) => {
    const [loading,setLoading]=useState(false);
    const [error ,setError]=useState("");
    const [message,setMessage]=useState("");

 const handleSubmit = async (e) => {
  e.preventDefault(); 

 }

  return (

        <form onSubmit={handleSubmit} className='card p-6'>
         <h2 className='text-base font-medium mb-6 p-6 border-b text-slate-900 border-slate-100 flex items-center gap-2'>
            <User className='w-5 h-6'/>Public Profile
         </h2>
         {error &&(
           <div className='bg-rose-50 text-rose-700 p-6 rounded-2xl text-sm border border-rose-200 mb-6 flex items-start gap-3'>
            <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
            {error}
           </div>
         )}
         {message &&(
           <div className='bg-rose-50 text-emerald-700 p-6 rounded-2xl border border-emerald-200 mb-6 flex items-start gap-3'>
            <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0'/>
            {message}
           </div>
         )}
         <div className='space-y-2.5'>
          <div className='grid grid-cols-1 sm:grid-cols-2 '>
            <div>
                <label htmlFor="" className='block text-sm font-medium mb-6'>Name</label>
                <input type="text" disabled value={`${initalData.firstName} ${initialData.lastName}`} className='bg-amber-50 text-slate-200 cursor-not-allowed'  />
            </div>
                <div>
                <label htmlFor="" className='block text-sm font-medium mb-6'>Email</label>
                <input type="email" disabled value={`${initalData.email}`} className='bg-amber-50 text-slate-200 cursor-not-allowed'  />
            </div>
            <div>
                  <div className='sm:col-span-2'>
                <label htmlFor="" className='block text-sm font-medium mb-6'>Position</label>
                <input type="text-area" disabled value={`${initalData.position}`} className='bg-amber-50 text-slate-200 cursor-not-allowed'  />
            </div>
            </div>
          </div>
         </div>
        </form>
  )
}

export default ProfileForm