import React from "react";

const Alert = ({ type = "info", message, onClose }) => {
  const baseClasses = "flex items-center p-4 rounded-md shadow-md";
  const typeClasses = {
    success: "bg-green-500 text-white",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    warning: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} relative`}>
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-sm font-bold hover:opacity-70"
      >
        ✖
      </button>
    </div>
  );
};

export default Alert;