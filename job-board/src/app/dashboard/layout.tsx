import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/appSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
        <SidebarProvider>
        <AppSidebar />
        <div className="w-full flex justify-center">
            <SidebarTrigger />
            {children}
        </div>
        </SidebarProvider>
    </div>
  )
}