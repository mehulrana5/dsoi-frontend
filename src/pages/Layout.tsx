import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  
  // Detect mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsSidebarOpen(!isMobile);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleTriggerClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    // Only close sidebar if in mobile view
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      triggerRef.current?.click();
    }
  };

  return (
    <SidebarProvider open={isSidebarOpen}>
      <AppSidebar 
        data-sidebar 
        closeSidebar={closeSidebar} 
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger 
            ref={triggerRef}
            onClick={handleTriggerClick}
          />
        </header>
        <div>
          <Outlet />
          <Toaster />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
