"use client";

import { AppSidebar } from "@/components/superadmin/sidebar/app-sidebar";
import { SiteHeader } from "@/components/superadmin/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { ScheduleHeader } from "@/components/schedule/schedule-header";

export default function RequestPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 ">
              <div className="px-4 lg:px-6">
                <div className="container mx-auto px-4 lg:px-6 py-6 mt-6 bg-white rounded-lg shadow-sm">
                  
                  <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <ScheduleHeader />
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}