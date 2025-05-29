"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import { NotificationProps } from "@/types/user"

export default function Notification({ id, title, description, type = "info", onClose }: NotificationProps) {
  const typeStyles = {
    info: "bg-blue-100 text-blue-700 border-blue-300",
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  };

  return (
    <div
      className={`flex items-start p-4 border rounded-lg shadow-md ${typeStyles[type]} mb-4`}
      role="alert"
    >
      <div className="flex-shrink-0">
        <Bell className="w-6 h-6" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-auto text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}