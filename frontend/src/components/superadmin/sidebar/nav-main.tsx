"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavMainProps = {
  items: {
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  activeItem?: string; 
  onItemSelect?: (item: string) => void; 
};

export function NavMain({ items, activeItem, onItemSelect }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-0">
        <SidebarMenu className="p-0 m-0">
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="p-0 m-0">
              <Link href={item.url} passHref>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => onItemSelect?.(item.title)}
                  className={`pl-4 w-full text-left rounded-none rounded-l-lg border-l-4 transition-colors ${
                    activeItem === item.title
                      ? "bg-orange-500 text-white border-orange-500" 
                      : "hover:bg-[var(--sidebar-hover-bg)] hover:text-[var(--sidebar-hover-text)] border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
