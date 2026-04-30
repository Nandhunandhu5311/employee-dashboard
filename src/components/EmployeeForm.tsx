import { useState, useEffect } from "react";
import type { Employee } from "../types/Employee";

type Props = {
  addEmployee: (emp: Employee) => void;
  updateEmployee: (emp: Employee) => void;
  editing: Employee | null;
  onClose?: () => void;
};

const EmployeeForm = ({
  addEmployee,
  updateEmployee,
  editing,
  onClose,
}: Props) => {
  const [form, setForm] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    department: "IT",
    status: "Active",
    joiningDate: "",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editing ? updateEmployee(form) : addEmployee(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 tracking-wide border-b-2 border-primary-200 dark:border-primary-800 pb-2">
        BASIC INFORMATION
      </h3>

      <div className="grid grid-cols-2 gap-5">
        <div className="group">
          <label className="label">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-pro group-hover:border-primary-400"
            required
          />
        </div>

        <div className="group">
          <label className="label">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-pro group-hover:border-primary-400"
            required
          />
        </div>

        <div className="group">
          <label className="label">Phone</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input-pro group-hover:border-primary-400"
          />
        </div>

        <div className="group">
          <label className="label">Department</label>
          <select
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value as Employee["department"],
              })
            }
            className="input-pro group-hover:border-primary-400"
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="group">
          <label className="label">Joining Date</label>
          <input
            type="date"
            value={form.joiningDate}
            onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
            className="input-pro group-hover:border-primary-400"
          />
        </div>

        <div className="group">
          <label className="label">Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value as Employee["status"],
              })
            }
            className="input-pro group-hover:border-primary-400"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t-2 border-gray-100 dark:border-gray-800">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
        >
          {editing ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;