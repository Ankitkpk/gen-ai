import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Shield } from "lucide-react";
import EmployeeFormLeftSide from "../components/EmployeeFormLelfSide";

const LoginLandingPage = () => {
  const portaloptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description:
        "Manage employees, departments, payroll, and system configuration.",
      icon: Shield,
    },
    {
      to: "/login/employee",
      title:
        "Employee Portal",
      description:
        "View your profile, track attendance, request time off, and access payslips.",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <EmployeeFormLeftSide />

      {/* Right Side */}
      <div className="flex-1 flex flex-col justify-center items-center relative overflow-y-auto p-4 md:p-10 lg:p-16">
        <div className="w-full max-w-md space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl lg:text-4xl font-medium text-slate-900 tracking-tight">
              Welcome Back
            </h1>

            <p className="text-slate-500 leading-relaxed font-light">
              Select your portal to securely access the System.
            </p>
          </div>

          {/* Portal Cards */}
          <div className="space-y-5">
            {portaloptions.map((portal, index) => {
              const Icon = portal.icon;

              return (
                <Link key={index} to={portal.to} className="p-2">
                  <button className="w-full flex justify-between items-center p-5 rounded-2xl border border-slate-200 bg-slate-100 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200">
                    <div className="flex items-center gap-4">

                      <div className="text-left">
                        <h2 className="text-lg font-medium text-slate-700 tracking-tight">
                          {portal.title}
                        </h2>

                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-4">
            <p className="text-sm text-slate-400 font-light">
              © 2026 GreatStack. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLandingPage;