import { useState, useEffect } from "react";
import { mockEmployees } from "../data/mockData";
import type { Employee } from "../types/Employee";

import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import Navbar from "../components/Navbar";
import AddEmployeeDrawer from "../components/AddEmployeeDrawer";

import { FiSearch, FiPlus } from "react-icons/fi";
import { MdFilterList } from "react-icons/md";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const stored = localStorage.getItem("employees");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("employees", JSON.stringify(mockEmployees));
    return mockEmployees;
  });

  const [editing, setEditing] = useState<Employee | null>(null);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const perPage = 10;

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (emp: Employee) => {
    setEmployees([...employees, { ...emp, id: Date.now() }]);
    setIsDrawerOpen(false);
  };

  const updateEmployee = (updated: Employee) => {
    setEmployees(employees.map((e) => (e.id === updated.id ? updated : e)));
    setEditing(null);
    setIsDrawerOpen(false);
  };

  const deleteEmployee = (id: number) => {
    if (!window.confirm("Delete this employee?")) return;
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const filteredEmployees = employees.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = department ? e.department === department : true;
    const matchStatus = status ? e.status === status : true;
    return matchSearch && matchDept && matchStatus;
  });

  const totalPages = Math.ceil(filteredEmployees.length / perPage);
  const paginatedEmployees = filteredEmployees.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    // ONLY CHANGED THE BACKGROUND GRADIENT
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-200 bg-clip-text text-transparent">
          Employee Dashboard
        </h2>

        <div className="rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="flex items-center px-4 h-12 w-full sm:w-64 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus-within:border-primary-400 transition-all">
              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none w-full text-sm text-gray-800 dark:text-white"
              />
            </div>

            <div className="flex items-center px-4 h-12 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600">
              <MdFilterList className="text-gray-400 mr-2" />
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-white"
              >
                <option value="">All Dept</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
              </select>
            </div>

            <div className="flex items-center px-4 h-12 rounded-xl bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600">
              <MdFilterList className="text-gray-400 mr-2" />
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setEditing(null);
              setIsDrawerOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:shadow-lg transition-all duration-200 font-semibold"
          >
            <FiPlus />
            Add Employee
          </button>
        </div>

        <div className="rounded-2xl shadow-xl overflow-hidden">
          <EmployeeTable
            employees={paginatedEmployees}
            onEdit={(emp: Employee) => {
              setEditing(emp);
              setIsDrawerOpen(true);
            }}
            onDelete={deleteEmployee}
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-5 py-2 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 border-2 border-gray-200 dark:border-gray-600 font-semibold hover:border-primary-400 transition-all"
          >
            Prev
          </button>
          <span className="px-5 py-2 rounded-xl shadow-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold">
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages || totalPages === 0}
            className="px-5 py-2 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 border-2 border-gray-200 dark:border-gray-600 font-semibold hover:border-primary-400 transition-all"
          >
            Next
          </button>
        </div>
      </div>

      <AddEmployeeDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <EmployeeForm
          addEmployee={addEmployee}
          editing={editing}
          updateEmployee={updateEmployee}
          onClose={() => setIsDrawerOpen(false)}
        />
      </AddEmployeeDrawer>
    </div>
  );
};

export default Dashboard;