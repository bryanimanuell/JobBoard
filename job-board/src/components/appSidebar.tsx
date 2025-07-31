import { Building, BriefcaseBusiness, Mails, Mail } from "lucide-react"
import Link from 'next/link';
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
    url: "/dashboard/profile",
    icon: Building,
  },
  {
    title: "Jobs",
    url: "/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: Mails,
  },
  {
    title: "Email Templates",
    url: "/dashboard/templates",
    icon: Mail
  }
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
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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