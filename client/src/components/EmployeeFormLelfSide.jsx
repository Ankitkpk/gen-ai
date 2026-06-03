import React from 'react';

const EmployeeFormLelfSide = () => {
  return (
    <div className="hidden md:flex w-1/2 bg-indigo-950 relative overflow-hidden border-r border-slate-200 items-center justify-start px-20">

      {/* Decorative Background Circle */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xl text-white">
        <h1 className="text-5xl font-medium leading-tight mb-6">
          Employee <br />
          Management System
        </h1>

        <p className="text-md text-slate-300 max-w-sm leading-relaxed">
          Streamline your workforce operations, track attendance,
          manage payroll, and empower your team securely.
        </p>
      </div>

    </div>
  );
};

export default EmployeeFormLelfSide;