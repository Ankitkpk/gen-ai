import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";

const PrintPayslipe = () => {
  const { id } = useParams();

  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const slip = dummyPayslipData.find((item) => item._id === id);
      setPayslip(slip);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!payslip) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-medium text-slate-600">
          Payslip not found.
        </p>
      </div>
    );
  }

  return (
    <div className=" py-4 px-4">
      <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white shadow-md">
        {/* Header */}
        <div className="border-b border-slate-200 p-5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            PAYSLIP
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            {format(
              new Date(payslip.year, payslip.month - 1),
              "MMMM yyyy"
            )}
          </p>
        </div>

        {/* Employee Details */}
        <div className="grid grid-cols-2 gap-4 border-b border-slate-200 p-5">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Employee Name
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {payslip.employee?.firstName} {payslip.employee?.lastName}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Position
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {payslip.employee?.position}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Employee ID
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {payslip.employeeId}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Generated On
            </p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {format(new Date(payslip.createdAt), "dd MMM yyyy")}
            </p>
          </div>
        </div>

        {/* Salary Details */}
        <div className="p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Salary Details
          </h2>

          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="px-5 py-2.5 font-medium text-slate-600">
                    Basic Salary
                  </td>
                  <td className="px-5 py-2.5 text-right font-semibold">
                    ₹{payslip.basicSalary.toLocaleString()}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="px-5 py-2.5 font-medium text-slate-600">
                    Allowances
                  </td>
                  <td className="px-5 py-2.5 text-right font-semibold text-green-600">
                    + ₹{payslip.allowances.toLocaleString()}
                  </td>
                </tr>

                <tr className="border-b border-slate-200">
                  <td className="px-5 py-2.5 font-medium text-slate-600">
                    Deductions
                  </td>
                  <td className="px-5 py-2.5 text-right font-semibold text-red-600">
                    - ₹{payslip.deductions.toLocaleString()}
                  </td>
                </tr>

                <tr className="bg-slate-50">
                  <td className="px-5 py-3 text-base font-bold text-slate-900">
                    Net Salary
                  </td>
                  <td className="px-5 py-3 text-right text-lg font-bold text-indigo-600">
                    ₹{payslip.netSalary.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Print Button */}
          <div className="mt-5 flex justify-end print:hidden">
            <button
              onClick={() => window.print()}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Print Payslip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPayslipe;