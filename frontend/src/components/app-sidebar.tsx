"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileQuestion,
  CalendarClock,
  Coins,
  Users,
  CalendarCheck,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard, 
    },
    {
      title: "Requests",
      url: "#",
      icon: FileQuestion,
    },
    {
      title: "Time Logs",
      url: "#",
      icon: CalendarClock, 
    },
    {
      title: "Schedule",
      url: "#",
      icon: Coins, 
    },
    {
      title: "Users",
      url: "#",
      icon: Users, 
    },
    {
      title: "Timesheets",
      url: "#",
      icon: CalendarCheck, 
    },
    {
      title: "Account Settings",
      url: "#",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState("Dashboard"); 

  return (
    <Sidebar collapsible="offcanvas" {...props} >
      <SidebarHeader>
        <div className="flex justify-center items-center w-full h-full">
          <img
            src="/LOGO1.svg"
            alt="Company Logo"
            className="h-8 w-auto"
          />
         
        </div>
      <hr></hr>
      </SidebarHeader>
      <SidebarContent >
        <NavMain
          items={data.navMain}
          activeItem={activeItem}
          onItemSelect={(item: string) => setActiveItem(item)} // Update active item on selection
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
