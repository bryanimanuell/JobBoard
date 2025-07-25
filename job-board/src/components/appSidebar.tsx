import { Building, BriefcaseBusiness, Mails } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Profile",
    url: "profile",
    icon: Building,
  },
  {
    title: "Jobs",
    url: "jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    url: "applications",
    icon: Mails,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="mt-10 text-gray-400 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-md">Menu</SidebarGroupLabel>
          <SidebarGroupContent className="py-2">
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarTrigger className="absolute left-65 text-white" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}