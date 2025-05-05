"use client";

import * as React from "react";
import { usePathname } from "next/navigation"; 
import {
  LayoutDashboard,
  FileQuestion,
  CalendarClock,
  Coins,
  Users,
  CalendarCheck,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard", 
      icon: LayoutDashboard,
    },
    {
      title: "Requests",
      url: "/admin/requests", 
      icon: FileQuestion,
    },
    {
      title: "Time Logs",
      url: "/admin/time-logs", 
      icon: CalendarClock,
    },
    {
      title: "Schedule",
      url: "/admin/schedule", 
      icon: Coins,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Timesheets",
      url: "/admin/timesheets",
      icon: CalendarCheck,
    },
    {
      title: "Account Settings",
      url: "/admin/account-settings", 
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname(); 
  const [activeItem, setActiveItem] = React.useState("");

  React.useEffect(() => {
   
    const currentItem = data.navMain.find((item) => pathname.startsWith(item.url));
    if (currentItem) {
      setActiveItem(currentItem.title);
    }
  }, [pathname]); 

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="flex justify-center items-center w-full h-full">
          <img src="/LOGO1.svg" alt="Company Logo" className="h-8 w-auto" />
        </div>
        <hr />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          activeItem={activeItem}
          onItemSelect={(item: string) => setActiveItem(item)} 
        />
      </SidebarContent>
      <hr />
      <SidebarFooter>
        <div className="flex justify-center items-center w-full h-full">
          <img src="/togetherbeyond.svg" alt="Together Beyond Logo" className="h-10 w-auto" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
