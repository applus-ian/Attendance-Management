import { AppSidebar } from "@/components/superadmin/sidebar/app-sidebar";
import { SiteHeader } from "@/components/superadmin/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserAccountsList } from "@/components/superadmin/user-accounts/user-accounts-list"

export default function UserAccounts() {
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
              
              <UserAccountsList />
                
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}