"use client";

import { AppSidebar } from "@/components/superadmin/sidebar/app-sidebar";
import { SiteHeader } from "@/components/superadmin/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RequestTable } from "@/components/superadmin/request/request-table";
import { Search } from "@/components/search";
import { useState } from "react";

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
                  <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Request</h1>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <Search
                      placeholder="Search requests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <RequestTable searchQuery={searchQuery} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}