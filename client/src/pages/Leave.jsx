import React, { useCallback, useEffect, useState } from "react";
import { dummyLeaveData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  PalmtreeIcon,
  PlusIcon,
  ThermometerIcon,
  UmbrellaIcon,
} from "lucide-react";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const isAdmin = false;

  const fetchLeaves = useCallback(() => {
    setLeaves(dummyLeaveData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading />;

  const approvedLeaves = leaves.filter(
    (leave) => leave.status === "APPROVED"
  );

  const sickCount = approvedLeaves.filter(
    (leave) => leave.type === "SICK"
  ).length;

  const casualCount = approvedLeaves.filter(
    (leave) => leave.type === "CASUAL"
  ).length;

  const annualCount = approvedLeaves.filter(
    (leave) => leave.type === "ANNUAL"
  ).length;

  const stats = [
    {
      label: "Sick Leave",
      value: sickCount,
      icon: ThermometerIcon,
    },
    {
      label: "Casual Leave",
      value: casualCount,
      icon: UmbrellaIcon,
    },
    {
      label: "Annual Leave",
      value: annualCount,
      icon: PalmtreeIcon,
    },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Leave Management
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            {!isAdmin
              ? "Manage leave applications"
              : "Your leave history and requests"}
          </p>
        </div>

        {!isAdmin && !isDeleted && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            Apply for Leave
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-white border border-slate-200 border-l-4 border-l-indigo-600 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-xl">
                  <Icon size={28} className="text-indigo-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Apply for Leave
            </h3>

            <p className="text-slate-500">
              Leave application form goes here.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-slate-200 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;