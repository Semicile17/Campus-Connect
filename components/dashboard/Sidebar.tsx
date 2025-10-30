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
  Speaker,
  SpeakerIcon,
  PaperclipIcon,
} from "lucide-react";
import { Button } from "../ui/button";

// Sidebar links based on roles with proper typing - MOVE THIS OUTSIDE COMPONENT
const sidebarLinks: SidebarLinks = {
  student: [
    { href: "/dashboard/student/profile", label: "Profile", icon: <User size={18} /> },
    { href: "/dashboard/student/attendance", label: "Attendance", icon: <BookOpen size={18} /> },
    { href: "/dashboard/student/results", label: "Results", icon: <BarChart3 size={18} /> },
    { href: "/dashboard/student/announcements", label: "Announcements", icon: <PaperclipIcon size={18} /> },
  ],
  faculty: [
    { href: "/dashboard/faculty", label: "Profile", icon: <User size={18} /> },
    { href: "/dashboard/faculty/attendance", label: "Attendance", icon: <CalendarCheck size={18} /> },
    { href: "/dashboard/faculty/classes", label: "Classes", icon: <ClipboardList size={18} /> },
    { href: "/dashboard/faculty/announcements", label: "Announcements", icon: <PaperclipIcon size={18} /> },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Home", icon: <Home size={18} /> },
    { href: "/dashboard/admin/users", label: "Users", icon: <Users size={18} /> },
    { href: "/dashboard/admin/faculty", label: "Faculty", icon: <GraduationCap size={18} /> },
    { href: "/dashboard/admin/courses", label: "Courses", icon: <FileText size={18} /> },
  ],
};

// Type guard to check if a string is a valid UserRole
function isValidUserRole(role: string): role is UserRole {
  return ['student', 'faculty', 'admin'].includes(role);
}

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null); // Fix: Initialize as any to avoid type conflicts
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    
    try {
      console.log("🔄 Starting logout process...");
      
      // Method 1: Call the logout API
      await fetch("/api/logout", { 
        method: "POST",
        credentials: "include" // Important for cookies
      });
      
      console.log("✅ Logout API called");
      
      // Method 2: Clear client-side storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem("auth_token");
        sessionStorage.clear();
      }
      
      // Method 3: Clear all possible cookie variations
      const domains = [
        window.location.hostname,
        '.' + window.location.hostname,
        'localhost',
        ''
      ];
      
      domains.forEach(domain => {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      });
      
      console.log("✅ All storage cleared");
      
      // Wait a moment to ensure everything is cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Force full page reload to reset everything
      window.location.href = "/login";
      
    } catch (error) {
      console.error("❌ Logout error:", error);
      // Fallback - clear everything and redirect
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

  // Get navigation links based on user role - DO THIS INSIDE COMPONENT
  const getNavigationLinks = () => {
    if (!user || !user.role) return [];
    
    const userRole = user.role;
    
    // Use type guard for safety
    if (isValidUserRole(userRole)) {
      return sidebarLinks[userRole];
    }
    
    // Fallback: try to use as key or return empty array
    return sidebarLinks[userRole as keyof typeof sidebarLinks] || [];
  };

  const links = getNavigationLinks();

  if (!user) {
    return (
      <aside className="w-64 bg-white shadow-lg h-full flex flex-col justify-center items-center text-gray-500">
        Loading...
      </aside>
    );
  }

  return (
    <aside className="md:block w-64 bg-white shadow-lg h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-indigo-600 capitalize">
          {user.role} Portal
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const active = pathname.includes(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                active
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="w-full flex justify-center">
        <Button 
          onClick={handleLogout} 
          disabled={isLoggingOut}
          className="m-10 w-2/3 bg-red-500 hover:bg-red-600"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </aside>
  );
}