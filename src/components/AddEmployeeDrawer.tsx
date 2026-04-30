import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const AddEmployeeDrawer = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
      />

      {/* Modal */}
      <div
        className="relative w-[95%] max-w-2xl 
        bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl 
        rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700
        animate-scaleIn overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 
        bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <div>
            <h2 className="text-lg font-semibold">
              Employee Details
            </h2>
            <p className="text-xs text-white/80">
              Add or update employee
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xl hover:rotate-90 transition"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default AddEmployeeDrawer;