import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
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
          {emp?.position} - {emp?.department || "No Department"} 
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm flex items-center justify-between border border-l-4 border-l-indigo-600 border-slate-200 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 cursor-pointer"
            >
                <div className="flex flex-col">
              

              <p className="text-slate-700 font-medium mt-1">
                {card.title}
              </p>
               <h2 className="text-2xl font-bold text-slate-800">
                {card.value}
              </h2>
                </div>
               
              <div className=" mb-4">
                <Icon className="text-indigo-600" size={28} />
              </div>

              

              
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
       <Link to="/attendance" className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2">
  
  Mark Attendance
  <ArrowRight size={18} />
</Link>

        <Link to="/leave" className="px-4 py-2 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition">
          Apply for Leave
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;