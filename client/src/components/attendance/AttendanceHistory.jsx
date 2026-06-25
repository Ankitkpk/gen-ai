import React from "react";
import { format } from "date-fns";

const AttendanceHistory = ({ history = [] }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Date
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Check In
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Check Out
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Working Hours
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Day Type
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {history.length > 0 ? (
              history.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 text-slate-700">
                    {format(new Date(record.date), "MMM dd, yyyy")}
                  </td>

                  <td className="px-6 py-4 text-slate-700">
                    {record.checkIn
                      ? format(new Date(record.checkIn), "hh:mm a")
                      : "--"}
                  </td>

                  <td className="px-6 py-4 text-slate-700">
                    {record.checkOut
                      ? format(new Date(record.checkOut), "hh:mm a")
                      : "--"}
                  </td>

                  <td className="px-6 py-4 text-slate-700">
                   {record.workingHours
  ? format(new Date(record.workingHours), "hh:mm")
  : "--"}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                      {record.dayType || "Working Day"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        record.status === "PRESENT"
                          ? "bg-green-100 text-green-700"
                          : record.status === "LATE"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;