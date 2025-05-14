import { AppSidebar } from "@/components/superadmin/sidebar/app-sidebar"
import { ChartAreaInteractive } from "@/components/superadmin/sidebar/chart-area-interactive"
import { RequestTableComponent } from "@/components/superadmin/dashboard/data-table"
import { SectionCards } from "@/components/superadmin/dashboard/section-cards"
import { SiteHeader } from "@/components/superadmin/dashboard/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default function SiteH() {
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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 bg-[#E4E0E0]">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
                <RequestTableComponent />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
