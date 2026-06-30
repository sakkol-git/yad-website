import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  colorVariant?: "primary" | "secondary" | "tertiary" | "info" | "warning" | "success" | "error";
}

export function StatCard({ title, value, icon, colorVariant = "primary" }: StatCardProps) {
  const colorMap = {
    primary: "bg-primary-container text-on-primary-container",
    secondary: "bg-secondary-container text-on-secondary-container",
    tertiary: "bg-tertiary-container text-on-tertiary-container",
    info: "bg-info-container text-on-info-container",
    warning: "bg-warning-container text-on-warning-container",
    success: "bg-success-container text-on-success-container",
    error: "bg-error-container text-on-error-container",
  };

  return (
    <div className="bg-surface-container-lowest p-5 rounded-md border border-outline-variant/30 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${colorMap[colorVariant]}`}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-on-surface-variant text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-on-surface">{value}</h3>
      </div>
    </div>
  );
}
