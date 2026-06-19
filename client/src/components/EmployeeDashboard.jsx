import React from "react";
import {
  Calendar1Icon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react";

const EmployeeDashboard = ({ data }) => {
  const emp = data?.employee;

  const cards = [
    {
      icon: Calendar1Icon,
      value: data?.currentMonthData || 0,
      title: "Days Present",
      subtitle: "This Month",
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves || 0,
      title: "Pending Leaves",
      subtitle: "Awaiting Approval",
    },
    {
      icon: DollarSignIcon,
      value: data?.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most Recent Salary",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome, {emp?.firstName}!
        </h1>

        <p className="text-slate-500 mt-1">
          {emp?.position} - {emp?.department}
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="text-indigo-600" size={28} />
              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                {card.value}
              </h2>

              <p className="text-slate-700 font-medium mt-1">
                {card.title}
              </p>

              
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">
          Mark Attendance
        </button>

        <button className="px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition">
          Apply for Leave
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;