"use client";

import { ShiftManagementModal } from "@/components/shifts-management/shift-management-modal";

export default function SchedulePage() {
  return (
    <div className="container mx-auto p-8">
      {/* <h1 className="text-2xl font-bold mb-6">Schedule Management Example</h1>
      <p className="mb-6">Click the button below to open the schedule modal:</p>
       */}
      <ShiftManagementModal />
    </div>
  );
} 