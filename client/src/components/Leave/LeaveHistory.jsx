import React, { useState } from "react";
import { format } from "date-fns";
import { Check, X } from "lucide-react";

const LeaveHistory = ({ leaves = [], isAdmin = true, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleUpdate = async (id, status) => {
    if (!onUpdate) return;

    setProcessing(id);

    try {
      await onUpdate(id, status);
    } catch (error) {
      console.error("Failed to update leave status:", error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {isAdmin && (
                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  EMPLOYEE
                </th>
              )}

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                TYPE
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                DATES
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                REASON
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                STATUS
              </th>

              {isAdmin && (
                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  ACTIONS
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr
                  key={leave._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  {isAdmin && (
                    <td className="px-6 py-4 text-slate-700">
                      {leave.employee?.firstName}{" "}
                      {leave.employee?.lastName}
                    </td>
                  )}

                  <td className="px-6 py-4 text-slate-700 font-medium">
                    {leave.type}
                  </td>

                  <td className="px-6 py-4 text-slate-700">
                    {format(new Date(leave.startDate), "MMM dd")}
                    {" - "}
                    {format(new Date(leave.endDate), "MMM dd, yyyy")}
                  </td>

                  <td className="px-6 py-4 text-slate-700">
                    {leave.reason}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        leave.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "PENDING"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  {isAdmin && (
                    <td className="px-6 py-4">
                      {leave.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleUpdate(leave._id, "APPROVED")
                            }
                            disabled={processing === leave._id}
                            className="w-9 h-9 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 transition-colors"
                            title="Approve"
                          >
                            {processing === leave._id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <Check size={16} />
                            )}
                          </button>

                          <button
                            onClick={() =>
                              handleUpdate(leave._id, "REJECTED")
                            }
                            disabled={processing === leave._id}
                            className="w-9 h-9 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 transition-colors"
                            title="Reject"
                          >
                            {processing === leave._id ? (
                              <span className="text-xs">...</span>
                            ) : (
                              <X size={16} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">
                          
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="py-8 text-center text-slate-500"
                >
                  No leave records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;