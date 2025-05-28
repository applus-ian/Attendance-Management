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

import { NavMain } from "@/components/superadmin/sidebar/nav-main";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { useUserList } from "@/hooks/useUserList";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/super-admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Requests",
      url: "/super-admin/requests",
      icon: FileQuestion,
    },
    {
      title: "Time Logs",
      url: "/super-admin/time-logs/",
      icon: CalendarClock,
    },
    {
      title: "Schedule",
      url: "/super-admin/schedule",
      icon: Coins,
    },
    {
      title: "Users",
      url: "/super-admin/users",
      icon: Users,
    },
    {
      title: "Timesheets",
      url: "/super-admin/timesheets",
      icon: CalendarCheck,
    },
    {
      title: "Account Settings",
      url: "/super-admin/account-settings",
      icon: User,
    },
    {
      title: "Audit Logs",
      url: "/super-admin/audit-logs",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = React.useState("");
  const { data: users = [] } = useUserList();

  // Find the first userId for time logs
  const firstUserId = users.length > 0 ? users[0].emp_id : null;

  // Update navMain to use the first userId for Time Logs
  const navMain = React.useMemo(() =>
    data.navMain.map((item) =>
      item.title === "Time Logs" && firstUserId
        ? { ...item, url: `/super-admin/time-logs/${firstUserId}` }
        : item
    ),
    [firstUserId]
  );

  React.useEffect(() => {
    let currentItem = navMain.find((item) => {
      if (item.title === "Time Logs") {
        return pathname.startsWith("/super-admin/time-logs/");
      }
      return pathname.startsWith(item.url);
    });
    if (currentItem) {
      setActiveItem(currentItem.title);
    }
  }, [pathname, navMain]);

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
          items={navMain}
          activeItem={activeItem}
          onItemSelect={(item: string) => setActiveItem(item)}
        />
      </SidebarContent>
      <hr />
      <SidebarFooter>
        <div className="flex justify-center items-center w-full h-full">
          <img
            src="/togetherbeyond.svg"
            alt="Together Beyond Logo"
            className="h-10 w-auto"
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
