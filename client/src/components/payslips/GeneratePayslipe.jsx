import React, { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";

const GeneratePayslipe = ({ employees , onSuccess }) => {
  const currentDate = new Date();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
    basicSalary: "",
    allowances: "",
    deductions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeModal = () => {
    setIsOpen(false);

    setFormData({
      employeeId: "",
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      basicSalary: "",
      allowances: "",
      deductions: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Payslip Data:", formData);

      // --------------------------
      // Call your API here
      //
      // await axios.post("/api/payslips", formData);
      // --------------------------

      if (onSuccess) {
        onSuccess();
      }

      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow transition"
      >
        <Plus size={20} />
        Generate Payslip
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Generate Monthly Payslip
            </h2>
            <p className="text-sm text-slate-500">
              Fill the employee salary details.
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Employee */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Employee
            </label>

            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.firstName} {emp.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* Month & Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Month
              </label>

              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={1}>January</option>
                <option value={2}>February</option>
                <option value={3}>March</option>
                <option value={4}>April</option>
                <option value={5}>May</option>
                <option value={6}>June</option>
                <option value={7}>July</option>
                <option value={8}>August</option>
                <option value={9}>September</option>
                <option value={10}>October</option>
                <option value={11}>November</option>
                <option value={12}>December</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Year
              </label>

              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="2024"
                className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Basic Salary
            </label>

            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              required
              placeholder="Enter basic salary"
              className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Allowances & Deductions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Allowances
              </label>

              <input
                type="number"
                name="allowances"
                value={formData.allowances}
                onChange={handleChange}
                placeholder="0"
                className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Deductions
              </label>

              <input
                type="number"
                name="deductions"
                value={formData.deductions}
                onChange={handleChange}
                placeholder="0"
                className="w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Payslip"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipe;