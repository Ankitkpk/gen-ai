import React, { useCallback, useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";
import EmployeeCard from "./EmployeeCard";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    department: "",
  });

  const fetchEmployees = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setEmployee(dummyEmployeeData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDeleteEmployee = (employeeToDelete) => {
    setEmployee((prev) =>
      prev.filter((emp) => emp.id !== employeeToDelete.id)
    );
  };

  const handleCreateEmployee = () => {
    const newEmployee = {
      id: Date.now(),
      ...formData,
      isDelete: false,
    };

    setEmployee((prev) => [...prev, newEmployee]);

    setFormData({
      firstName: "",
      lastName: "",
      position: "",
      department: "",
    });

    setShowCreateModal(false);
  };

  const handleUpdateEmployee = () => {
    setEmployee((prev) =>
      prev.map((emp) =>
        emp.id === editEmployee.id ? editEmployee : emp
      )
    );

    setEditEmployee(null);
  };

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

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Employee
        </button>
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
            className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="flex-1 px-4 py-3 border border-slate-300 rounded-xl"
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

      {/* Employee Grid */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin size-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onDelete={handleDeleteEmployee}
              onEdit={setEditEmployee}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create Employee</h2>

            <div className="space-y-3">
              <input
                placeholder="First Name"
                className="w-full border p-3 rounded-lg"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
              />

              <input
                placeholder="Last Name"
                className="w-full border p-3 rounded-lg"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
              />

              <input
                placeholder="Position"
                className="w-full border p-3 rounded-lg"
                value={formData.position}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    position: e.target.value,
                  })
                }
              />

              <select
                className="w-full border p-3 rounded-lg"
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                  })
                }
              >
                <option value="">Select Department</option>

                {DEPARTMENTS.map((dep) => (
                  <option key={dep}>{dep}</option>
                ))}
              </select>

              <button
                onClick={handleCreateEmployee}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg"
              >
                Create Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editEmployee && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setEditEmployee(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

            <div className="space-y-3">
              <input
                className="w-full border p-3 rounded-lg"
                value={editEmployee.firstName}
                onChange={(e) =>
                  setEditEmployee({
                    ...editEmployee,
                    firstName: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-3 rounded-lg"
                value={editEmployee.lastName}
                onChange={(e) =>
                  setEditEmployee({
                    ...editEmployee,
                    lastName: e.target.value,
                  })
                }
              />

              <input
                className="w-full border p-3 rounded-lg"
                value={editEmployee.position}
                onChange={(e) =>
                  setEditEmployee({
                    ...editEmployee,
                    position: e.target.value,
                  })
                }
              />

              <button
                onClick={handleUpdateEmployee}
                className="w-full bg-green-600 text-white py-3 rounded-lg"
              >
                Update Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;