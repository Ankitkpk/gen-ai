import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import EmployeeCard from "./EmployeeCard";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [editEmployee,setEditEmployee]=useState(null);
  const [showCreatemodal,setShowCreatemodal]=useState(false);

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
      emp.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastName?.toLowerCase().includes(search.toLowerCase());

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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-[4]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search employee..."
            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">All Departments</option>

          {DEPARTMENTS.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Cards */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin size-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.length === 0 ? (
            <div className="col-span-full text-center bg-white rounded-2xl  border border-dashed border-slate-300 p-12">
              <p className="text-slate-500 text-lg">
                No employee found
              </p>
            </div>
          ) : (
            filteredEmployees.map((emp) => (
              <EmployeeCard key={emp.id}  employee={emp} onDelete={fetchEmployees} onEdit={(e)=>setEditEmployee(e)}/>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Employee;