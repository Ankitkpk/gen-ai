import React from "react";
import {
  Calendar1Icon,
  BuildingIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react";

const AdminDashboard = ({ data }) => {
    console.log(data);
  const stats = [
    {
      icon: UsersIcon,
      value: data?.totalEmployees || 0,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: BuildingIcon,
      value: data?.totalDepartments || 0,
      label: "Departments",
      description: "Organization units",
    },
    {
      icon: Calendar1Icon,
      value: data?.todayAttendance || 0,
      label: "Today's Attendance",
      description: "Checked in today",
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves|| 0,
      label: "Pending Leaves",
      description: "Awaiting approval",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Overview of employees, attendance, departments, and leave requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm flex items-center justify-between border border-l-4 border-l-indigo-600 border-slate-200 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 cursor-pointer"
            >
              <div className="flex flex-col">
                <p className="text-slate-700 font-medium">
                  {stat.label}
                </p>

                <h2 className="text-2xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div>
                <Icon className="text-indigo-600" size={28} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;