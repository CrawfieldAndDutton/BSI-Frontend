
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive sidebar collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        isMobile={isMobile} 
      />
      <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
        <TopNav sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        <main className="flex-1 overflow-y-auto p-3 md:p-5 lg:p-6">
          {children}
        </main>
      </div>
      <Toaster />
      <Sonner />
    </div>
  );
}
