import React from "react";
import { PencilIcon, TrashIcon } from "lucide-react";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    onDelete(employee);
  };

  return (
    <div className="group relative card card-hover overflow-hidden">
      {/* Employee Avatar */}

      <div className="bg-slate-100 p-10">
          <div className="w-full flex justify-center items-center pt-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-200 to-slate-100 flex items-center justify-center">
          <span className="text-2xl font-medium text-indigo-500">
            {employee.firstName?.[0]}
            {employee.lastName?.[0]}
          </span>
        </div>
      </div>
        {/* Department & Status */}
      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-white/80 backdrop-blur-sm px-2.5 py-1 text-xs font-medium rounded-lg">
          {employee.department || "Remote"}
        </span>

        {employee.isDelete && (
          <span className="bg-red-500/80 text-white text-xs font-medium px-2.5 py-1 rounded-lg">
            DELETED
          </span>
        )}
      </div>
      </div>
    

      

      {/* Action Buttons */}
      {!employee.isDelete && (
        <div
          className="absolute inset-0 bg-gradient-to-t from-indigo-700/20 via-transparent to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          flex items-end justify-center pb-6 gap-3"
        >
          <button
            onClick={() => onEdit(employee)}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-indigo-600 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-red-600 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Employee Details */}
      <div className="p-5 text-center">
        <h3 className="text-slate-800 font-medium text-lg">
          {employee.firstName} {employee.lastName}
        </h3>

        <p className="text-xs text-slate-400 mt-1">
          {employee.position}
        </p>
      </div>
    </div>
  );
};

export default EmployeeCard;