import React from "react";

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export function Alert({ message, type = "info" }: AlertProps) {
  const alertClasses = {
    success: "bg-green-100 border border-green-400 text-green-700",
    error: "red-100 border border-red-400 text-red-700",
    warning: "yellow-100 border border-yellow-400 text-yellow-700",
    info: "blue-100 border border-blue-400 text-blue-700",
  };
  return (
    <div className={`mb-6 p-3 ${alertClasses[type]} text-sm rounded-md`}>
      {message}
    </div>
  );
}
