"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  BookOpen,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  Phone,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  {
    href: "/institute",
    label: "Institute",
    icon: <Building className="w-4 h-4" />,
  },
  {
    href: "/academics",
    label: "Academics",
    icon: <BookOpen className="w-4 h-4" />,
  },
  { href: "/students", label: "Students", icon: <Users className="w-4 h-4" /> },
  { href: "/campus", label: "Campus", icon: <Building className="w-4 h-4" /> },
  {
    href: "/alumni",
    label: "Alumni",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    href: "/placement",
    label: "T&P Cell",
    icon: <Briefcase className="w-4 h-4" />,
  },
  { href: "/contact", label: "Contact", icon: <Phone className="w-4 h-4" /> },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const allowedRoutes = ["/", "/about", "/contact"];
  const shouldShow = allowedRoutes.includes(pathname);

  
  if (!shouldShow) return null;

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-transparent rounded-lg flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="GBPIET Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 font-sans">GBPIET</h1>
                <p className="text-[10px] p-1 bg-green-200 rounded-md text-gray-800 font-sans">CampusConnect</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 p-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-blue-700 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-blue-50 rounded-lg border border-blue-200"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center space-x-1">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Login Button - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-xl"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-blue-700 bg-blue-50 border border-blue-200"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                {/* Mobile Login Button */}
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 mt-4"
                >
                  <Users className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
