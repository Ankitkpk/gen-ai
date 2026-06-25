import React, { useState } from 'react'
import {
  Briefcase,
  Calendar,
  FileText,
  X,
  Send
} from "lucide-react";
const ApplyLeaveModal = ({open,onClose,onSuccess}) => {
    const [loading,setLoading]=useState(false);
    const today=new Date();
    const tommorow=new Date(today);
    tommorow.setDate(today.getDate() + 1);
    const minDate=tommorow.toISOString().split("T")[0];
   // "2026-06-26T10:00:00.000Z"
  //  split("T")
  // ["2026-06-26", "10:00:00.000Z"]

  const handleSubmit=(e)=>{
     e.preventdefault(e);
  }

  if(!open)return null;
  return (
    <div className='fixed inset-0 flex justify-center p-4 bg-black/90 backdrop-blur-sm' onClick={onClose}>
    <div
  className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
  onClick={(e) => e.stopPropagation()}
>
  {/* Header */}
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-slate-900">
      Apply for Leave
    </h2>
    <p className="text-slate-500 mt-1">
      Submit your leave request for approval
    </p>
  </div>

  {/* Leave Type */}
  <div className="mb-5">
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
      <Briefcase size={16} />
      Leave Type
    </label>

    <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
      <option>Sick Leave</option>
      <option>Casual Leave</option>
      <option>Annual Leave</option>
    </select>
  </div>

  {/* Duration */}
  <div className="mb-5">
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
      <Calendar size={16} />
      Duration
    </label>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs text-slate-500 mb-1">From</p>
        <input
          type="date"
          min={minDate}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <p className="text-xs text-slate-500 mb-1">To</p>
        <input
          type="date"
           min={minDate}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  </div>

  {/* Reason */}
  <div className="mb-6">
    <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
      <FileText size={16} />
      Reason
    </label>

    <textarea
      rows="4"
      placeholder="Enter reason for leave..."
      className="w-full px-4 py-3 border border-slate-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Actions */}
  <div className="flex justify-evenly gap-3">
    <button
      type="button"
      className="flex items-center gap-2 px-8 py-2.5 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition"
    >
      <X size={16} />
      Cancel
    </button>

    <button
      type="submit"
      className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
    >
      <Send size={16} />
      Submit
    </button>
  </div>
</div>
    </div>
  )
}

export default ApplyLeaveModal