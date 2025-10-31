/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { UserState } from "@/lib/types/user";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole, SidebarLinks } from "@/lib/types/navigation";
import { getUser } from "@/lib/getUser";
import { useEffect, useState } from "react";
import {
  User,
  BookOpen,
  BarChart3,
  ClipboardList,
  Users,
  GraduationCap,
  FileText,
  CalendarCheck,
  Home,
  PaperclipIcon,
  Menu,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

// Sidebar links based on roles with proper typing
const sidebarLinks: SidebarLinks = {
  student: [
    { href: "/dashboard/student/profile", label: "Profile", icon: <User size={20} /> },
    { href: "/dashboard/student/attendance", label: "Attendance", icon: <BookOpen size={20} /> },
    { href: "/dashboard/student/results", label: "Results", icon: <BarChart3 size={20} /> },
    { href: "/dashboard/student/announcements", label: "Announcements", icon: <PaperclipIcon size={20} /> },
  ],
  faculty: [
    { href: "/dashboard/faculty", label: "Profile", icon: <User size={20} /> },
    { href: "/dashboard/faculty/attendance", label: "Attendance", icon: <CalendarCheck size={20} /> },
    { href: "/dashboard/faculty/classes", label: "Classes", icon: <ClipboardList size={20} /> },
    { href: "/dashboard/faculty/announcements", label: "Announcements", icon: <PaperclipIcon size={20} /> },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Home", icon: <Home size={20} /> },
    { href: "/dashboard/admin/users", label: "Users", icon: <Users size={20} /> },
    { href: "/dashboard/admin/faculty", label: "Faculty", icon: <GraduationCap size={20} /> },
    { href: "/dashboard/admin/courses", label: "Courses", icon: <FileText size={20} /> },
  ],
};

// Type guard to check if a string is a valid UserRole
function isValidUserRole(role: string): role is UserRole {
  return ['student', 'faculty', 'admin'].includes(role);
}

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  async function handleLogout() {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    try {
      console.log("🔄 Starting logout process...");
      
      await fetch("/api/logout", { 
        method: "POST",
        credentials: "include"
      });
      
      console.log("✅ Logout API called");
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem("auth_token");
        sessionStorage.clear();
      }
      
      // Clear cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      console.log("✅ All storage cleared");
      
      await new Promise(resolve => setTimeout(resolve, 100));
      window.location.href = "/login";
      
    } catch (error) {
      console.error("❌ Logout error:", error);
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      }
    } finally {
      setIsLoggingOut(false);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const data = await getUser();
      setUser(data);
    }
    fetchUser();
  }, []);

  const getNavigationLinks = () => {
    if (!user || !user.role) return [];
    
    const userRole = user.role;
    
    if (isValidUserRole(userRole)) {
      return sidebarLinks[userRole];
    }
    
    return sidebarLinks[userRole as keyof typeof sidebarLinks] || [];
  };

  const links = getNavigationLinks();

  // Mobile menu button
  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      aria-label="Toggle menu"
    >
      {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  // Mobile overlay
  const MobileOverlay = () => (
    <div
      className={cn(
        "lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
        isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={() => setIsMobileOpen(false)}
    />
  );

  // Sidebar content component
  const SidebarContent = () => {
    if (!user) {
      return (
        <div className="flex flex-col justify-center items-center text-gray-500 h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
          Loading...
        </div>
      );
    }

    return (
      <>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-indigo-600 capitalize">
            {user.role} Portal
          </h2>
          <p className="text-sm text-gray-500 mt-1 truncate">
            {user.name || user.email}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const active = pathname === link.href || pathname.includes(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-base font-medium",
                  active
                    ? "bg-indigo-100 text-indigo-700 border-l-4 border-indigo-600"
                    : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                )}
              >
                <span className={active ? "text-indigo-600" : "text-gray-500"}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button 
            onClick={handleLogout} 
            disabled={isLoggingOut}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 transition-colors duration-200"
            size="lg"
          >
            {isLoggingOut ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging out...
              </>
            ) : (
              "Logout"
            )}
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <MobileMenuButton />

      {/* Mobile Overlay */}
      <MobileOverlay />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 bg-white shadow-lg h-full flex-col fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Spacer for desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
}