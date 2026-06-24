import { AlertCircleIcon, Calendar1Icon, Clock10Icon } from "lucide-react";
import React from "react";

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter(
    (h) => h.status === "PRESENT" || h.status === "LATE"
  ).length;

  const totalLate = history.filter(
    (h) => h.status === "LATE"
  ).length;

  const stats = [
    {
      label: "Days Present",
      value: totalPresent,
      icon: Calendar1Icon,
    },
    {
      label: "Late Arrivals",
      value: totalLate,
      icon: AlertCircleIcon,
    },
    {
      label: "Avg. Work Hrs",
      value: "8.5 Hrs",
      icon: Clock10Icon,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
           className="bg-white border border-slate-200 border-l-4 border-l-indigo-600 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-start gap-4">
               <div className="p-3 rounded-xl bg-indigo-100">
                <Icon className="size-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>

                <h2 className="text-2xl font-mediun text-slate-900 mt-2">
                  {stat.value}
                </h2>
              </div>

             
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;