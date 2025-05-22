import React from "react";

interface RoleSwitchProps {
  currentRole: "admin" | "super_admin" | "employee";
  onSwitch: () => void;
}

const RoleSwitch: React.FC<RoleSwitchProps> = ({ currentRole, onSwitch }) => {
  // If admin or super_admin, toggle is right; if employee, toggle is left
  const isAdminSide = currentRole === "admin" || currentRole === "super_admin";

  return (
    <div className="flex items-center space-x-2">
      
      <span className={`font-medium ${currentRole === "admin" ? "text-orange-500" : "text-gray-500"}`}>
        
      </span>
      <button
        className={`relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 focus:outline-none transition-colors`}
        onClick={onSwitch}
        aria-pressed="false"
      >
        <span className="sr-only">Switch Role</span>
        <span
          className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform
            ${isAdminSide ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
      <span className={`font-medium ${currentRole === "employee" ? "text-orange-500" : "text-gray-500"}`}>
        EmployeeAdmin
      </span>
    </div>
  );
};

export default RoleSwitch;