
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bell,
  CreditCard,
  Home,
  PanelLeft,
  Settings,
  Users,
  Phone,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

export function Sidebar({ collapsed, setCollapsed, isMobile }: SidebarProps) {
  const location = useLocation();
  
  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: Home },
    { title: "Users", path: "/users", icon: Users },
    { title: "Customers", path: "/customers", icon: CreditCard },
    { title: "Monitoring", path: "/monitoring", icon: BarChart3 },
    { title: "Recovery", path: "/recovery", icon: Phone },
    { title: "Notifications", path: "/notifications", icon: Bell },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  // Close sidebar when clicked outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && !collapsed) {
        const sidebar = document.getElementById('main-sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setCollapsed(true);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed, setCollapsed, isMobile]);

  // Handle route changes
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [location.pathname, isMobile, setCollapsed]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
      
      <aside
        id="main-sidebar"
        className={cn(
          "bg-sidebar fixed md:static h-screen z-30 flex flex-col shadow-lg transition-all duration-300 ease-in-out",
          {
            "w-64": !collapsed,
            "w-16": collapsed,
            "transform -translate-x-full": isMobile && collapsed,
            "transform translate-x-0": !isMobile || !collapsed,
          }
        )}
      >
        <div className="p-4 flex justify-between items-center border-b border-sidebar-border">
          <div className={cn("flex items-center", { "justify-center w-full": collapsed })}>
            {collapsed ? (
              <img src="/lovable-uploads/1feca82a-073f-4352-b4fb-c606f5f94bd6.png" alt="BankLens Logo" className="h-8" />
            ) : (
              <div className="flex items-center">
                <img src="/lovable-uploads/1feca82a-073f-4352-b4fb-c606f5f94bd6.png" alt="BankLens Logo" className="h-8 mr-2" />
                <span className="text-sidebar-foreground font-semibold text-lg">BankLens</span>
              </div>
            )}
          </div>
          <div className="flex items-center">
            {isMobile && !collapsed ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(true)}
                className="text-sidebar-foreground hover:bg-sidebar-accent md:hidden"
              >
                <X size={18} />
              </Button>
            ) : !collapsed ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(true)}
                className="text-sidebar-foreground hover:bg-sidebar-accent hidden md:flex"
              >
                <PanelLeft size={18} />
              </Button>
            ) : null}
          </div>
        </div>
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>
                  <div
                    className={cn(
                      "flex items-center py-2 px-3 rounded-md transition-all smooth-transition",
                      {
                        "justify-center": collapsed,
                        "bg-sidebar-accent text-sidebar-foreground": location.pathname.startsWith(item.path),
                        "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground": !location.pathname.startsWith(item.path),
                      }
                    )}
                  >
                    <item.icon size={20} />
                    {!collapsed && <span className="ml-3 animate-slide-in">{item.title}</span>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn(
            "flex items-center",
            { "justify-center": collapsed }
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-medium",
              { "mx-auto": collapsed }
            )}>
              AD
            </div>
            {!collapsed && (
              <div className="ml-3 animate-slide-in">
                <p className="text-sidebar-foreground text-sm font-medium">Admin User</p>
                <p className="text-sidebar-foreground/70 text-xs">admin@banklens.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
