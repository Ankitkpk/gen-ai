import React from "react";
import { Download } from "lucide-react";
import { format } from "date-fns";

const PayslipTable = ({ payslip, isAdmin }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {isAdmin && (
                <th className="px-6 py-4 text-left font-semibold text-slate-600">
                  Employee
                </th>
              )}
             {!isAdmin && (
              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Period
              </th>
             )}

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Basic Salary
              </th>

              <th className="px-6 py-4 text-left font-semibold text-slate-600">
                Net Salary
              </th>

              <th className="px-6 py-4 text-center font-semibold text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payslip.length > 0 ? (
              payslip.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  {isAdmin && (
                    <td className="px-6 py-4 text-slate-700">
                      {item.employee?.firstName}{" "}
                      {item.employee?.lastName}
                    </td>
                  )}
                  
                  {!isAdmin && (
                  <td className="px-6 py-4 text-slate-700">
                    {format(new Date(`${item.year}-${item.month}-01`), "MMM, yyyy")}
              
                  </td>
                  )}
                  <td className="px-6 py-4 font-medium text-slate-700">
                    ₹ {item.basicSalary}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹ {item.netSalary}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      className="inline-flex items-center justify-center gap-2  text-xs p-3 rounded-lg text-blue-600 bg-slate-100 transition"
                      title="Download Payslip"
                      onClick={()=>window.open(`/print/payslipe/${item._id}`)}
                    >
                      <Download size={15} />
                       Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-6 py-8 text-center text-slate-500"
                >
                  No payslips found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipTable;