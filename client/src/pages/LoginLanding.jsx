import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldAlert, User } from 'lucide-react';

const LoginLanding = () => {
  const navigate = useNavigate();

  const portalOptions = [
    {
      to: '/login/admin',
      title: 'Admin Portal',
      icon: ShieldAlert,
    },
    {
      to: '/login/employee',
      title: 'Employee Portal',
      icon: User,
    },
  ];

  return (
    <div className="w-full md:w-1/2 flex items-center min-h-screen p-6 sm:p-12 bg-slate-50">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">
            Welcome Back
          </h2>

          <p className="text-slate-600">
            Select your portal to securely access the system.
          </p>
        </div>

        {/* Portal Cards */}
        <div className="space-y-4">
          {portalOptions.map((portal) => {
            const Icon = portal.icon;

            return (
              <div
                key={portal.to}
                onClick={() => navigate(portal.to)}
                className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-indigo-100">
                    <Icon className="w-5 h-5 text-indigo-600" />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900">
                    {portal.title}
                  </h3>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-indigo-600" />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10">
          <p className="text-sm text-slate-500">
            © 2026 GreatStack. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;