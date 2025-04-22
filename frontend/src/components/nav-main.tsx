"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavMainProps = {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  activeItem?: string;
  onItemSelect?: (item: string) => void;
};

export function NavMain({
  items,
}: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-0">
        <SidebarMenu className="p-0 m-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="p-0 m-0">
              <SidebarMenuButton
                tooltip={item.title}
                className="hover:bg-[var(--sidebar-hover-bg)] hover:text-[var(--sidebar-hover-text)] transition-colors pl-4 w-full text-left rounded-none rounded-l-lg border-l-4 border-transparent hover:border-white"
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.title}</span>
                </div>
              
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup> 
  );
}
