import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/providers/tanStackProvider";
import VisitorChatbot from "@/components/chatbot/VisitorChatBot";
import { Toaster } from "sonner";
import Navbar from "@/components/home/Navbar";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusConnect-GBPIET",
  description: "Smart Campus System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanStackProvider>
          <Navbar/>
          {children}
          <VisitorChatbot />
          <Toaster richColors position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
