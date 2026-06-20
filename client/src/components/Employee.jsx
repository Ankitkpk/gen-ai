import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Mail,
  Phone,
  Building2,
  Users,
} from "lucide-react";
import { dummyEmployeeData } from "../assets/assets";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const fetchEmployees = useCallback(async () => {
    setLoading(true);

    setTimeout(() => {
      setEmployee(dummyEmployeeData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filteredEmployees = employee.filter((emp) => {
    const matchSearch =
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase());

    const matchDepartment =
      department === "" || emp.department === department;

    return matchSearch && matchDepartment;
  });

  return (
    <div className="p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
            Employees
          </h1>
          <p className="text-slate-500 mt-1">
            Manage and monitor your workforce
          </p>
        </div>

        <Link
          to="/employees/add"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md"
        >
          <Plus size={18} />
          Add Employee
        </Link>
      </div>

      {/* Search & Filter */}
      <div>
        <div className="flex flex-col md:flex-row gap-4">
  <div className="relative flex-[4]">
    <Search
      size={18}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
    />
    <input
      type="text"
      placeholder="Search employee..."
      className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl"
    />
  </div>

  <select className="flex-1 px-4 py-3 border border-slate-300 rounded-xl">
    <option>All Departments</option>
    <option>Engineering</option>
    <option>HR</option>
    <option>Finance</option>
  </select>
</div>
      </div>

      {/* Employee Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse"
            >
              <div className="h-14 w-14 rounded-full bg-slate-200 mb-4"></div>

              <div className="h-4 bg-slate-200 rounded w-2/3 mb-3"></div>
              <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
          <h3 className="text-lg font-semibold text-slate-700">
            No Employees Found
          </h3>
          <p className="text-slate-500 mt-2">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredEmployees.map((emp) => (
            <div
              key={emp._id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    emp.image ||
                    "https://ui-avatars.com/api/?name=Employee"
                  }
                  alt={emp.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div>
                  <h3 className="font-semibold text-slate-800 text-lg">
                    {emp.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {emp.position || "Employee"}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={16} />
                  <span className="text-sm">{emp.email}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={16} />
                  <span className="text-sm">{emp.phone}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                  <Building2 size={16} />
                  <span className="text-sm">{emp.department}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between">
                <button className="text-indigo-600 font-medium hover:text-indigo-700">
                  View
                </button>

                <button className="text-emerald-600 font-medium hover:text-emerald-700">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employee;