import React from "react";

interface AlertProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export function Alert({ message, type = "info" }: AlertProps) {
  const alertClasses = {
    success: "bg-vm-success-500 border border-vm-success text-vm-success",
    error: "bg-vm-danger-500 border border-vm-danger text-vm-danger",
    warning: "bg-vm-warning-500 border border-vm-warning text-vm-warning",
    info: "bg-vm-secondary-500 border border-vm-secondary text-vm-secondary",
  };
  return (
    <div className={`mb-6 p-3 ${alertClasses[type]} text-sm rounded-md`}>
      {message}
    </div>
  );
}
