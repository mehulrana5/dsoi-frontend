import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

export default function Page() {
  const userAgent = navigator.userAgent.toLowerCase()
  alert(`
    Includes chrome:${userAgent.includes("chrome")}
    Is desktop:${userAgent.includes("windows") || userAgent.includes("linux")}    
    `);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>
        <div>
          <Outlet />
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
