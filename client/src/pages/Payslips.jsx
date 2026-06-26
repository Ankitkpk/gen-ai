import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import { Plus } from "lucide-react";
import Loading from "../components/Loading";
import PayslipTable from "../components/payslips/PlayslipTable";

const Payslips = () => {
  const [payslip, setPayslip] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true;

  const fetchPayslip = useCallback(() => {
    setPayslip(dummyPayslipData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPayslip();
  }, [fetchPayslip]);

  useEffect(() => {
    if (isAdmin) {
      setEmployees(dummyEmployeeData);
    }
  }, [isAdmin]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen  p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-medium text-slate-800">
              Payslips
            </h1>

            <p className="mt-2 text-slate-500">
              {isAdmin
                ? "Generate and Manage Employee Payslips"
                : "View your Payslip History"}
            </p>
          </div>

          {isAdmin && (
            <button className="px-6 py-3 flex items-center gap-1 rounded-lg bg-indigo-700 text-white font-medium shadow transition duration-300">
              <Plus size={20} />
             <span>Generate Payslip</span>
            </button>
          )}
        </div>
        <PayslipTable payslip={payslip} isAdmin={isAdmin}/>
      </div>
    </div>
  );
};

export default Payslips;