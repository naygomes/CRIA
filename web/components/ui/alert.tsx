import React from "react";

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export function Alert({ message, type = "info" }: AlertProps) {
  const alertClasses = {
    success:
      "bg-vm-success-100 border border-vm-success-400 text-vm-success-700",
    error: "bg-vm-error-100 border border-vm-error-400 text-vm-error-700",
    warning:
      "bg-vm-warning-100 border border-vm-warning-400 text-vm-warning-700",
    info: "bg-vm-secondary-100 border border-vm-secondary-400 text-vm-secondary-700",
  };
  return (
    <div className={`mb-6 p-3 ${alertClasses[type]} text-sm rounded-md`}>
      {message}
    </div>
  );
}
