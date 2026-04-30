import type { Employee } from "../types/Employee";

type Props = {
  employees: Employee[];
  onEdit: (emp: Employee) => void;
  onDelete: (id: number) => void;
};

const EmployeeTable = ({ employees, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-700 dark:to-primary-800">
        <div className="grid grid-cols-5 px-6 py-4 text-sm font-semibold text-white tracking-wide">
          <span>Name</span>
          <span>Email</span>
          <span>Department</span>
          <span>Status</span>
          <span className="text-center">Actions</span>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {employees.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No employees found
          </div>
        ) : (
          employees.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-5 px-6 py-4 items-center transition-all duration-200 hover:bg-primary-50/50 dark:hover:bg-primary-900/20"
            >
              <span className="font-semibold text-gray-800 dark:text-white">
                {e.name}
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {e.email}
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                <span className="px-3 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-semibold">
                  {e.department}
                </span>
              </span>
              <span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    e.status === "Active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                  }`}
                >
                  {e.status}
                </span>
              </span>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => onEdit(e)}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(e.id)}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:shadow-lg transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;