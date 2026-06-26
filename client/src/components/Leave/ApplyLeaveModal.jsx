import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  FileText,
  X,
  Send,
  Loader2Icon,
} from "lucide-react";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    console.log(formData);

    setTimeout(() => {
      setLoading(false);

      if (onSuccess) {
        onSuccess(formData);
      }

      setFormData({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: "",
      });

      onClose();
    }, 1000);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Apply for Leave
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Submit your leave request for approval
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Leave Type */}
          <div className="mb-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Briefcase size={16} />
              Leave Type
            </label>

            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Calendar size={16} />
              Duration
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1 text-xs text-slate-500">From</p>

                <input
                  type="date"
                  name="fromDate"
                  min={minDate}
                  value={formData.fromDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-500">To</p>

                <input
                  type="date"
                  name="toDate"
                  min={formData.fromDate || minDate}
                  value={formData.toDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileText size={16} />
              Reason
            </label>

            <textarea
              name="reason"
              rows={3}
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for leave..."
              required
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Buttons */}
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-slate-700 transition hover:bg-slate-100"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={18} />
              {loading ? <Loader2Icon className="w-4 h-4" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;