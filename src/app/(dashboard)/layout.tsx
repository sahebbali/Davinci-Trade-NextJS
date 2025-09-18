"use client";
import DashNavbar from "@/components/DashNavbar";
import Menu from "@/components/Menu";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ToastProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex">
      {/* Sidebar - Not Scrollable */}
      <SessionProvider>
        <ToastProvider>
          <div
            className={`fixed lg:static top-0 left-0 w-64 bg-white shadow-md z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:w-[16%] xl:w-[20%] p-4`}
          >
            {/* Logo + Close Btn (Mobile) */}
            <div className="flex items-center justify-between lg:mb-4">
              <Link
                href="/"
                className="flex items-center justify-center lg:justify-start gap-2"
              >
                <Image src="/logo.png" alt="logo" width={32} height={32} />
                <span className="hidden lg:block font-bold">
                  Aldenaire & Partners
                </span>
              </Link>
              <button
                className="lg:hidden p-1 text-gray-600"
                onClick={() => setSidebarOpen(false)}
              >
                <FiX size={22} />
              </button>
            </div>
            <Menu sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />
          )}

          {/* Right side content - Scrollable */}
          <div className="flex-1 bg-[#F7F8FA] flex flex-col overflow-y-auto">
            {" "}
            {/* Added overflow-y-auto here */}
            <DashNavbar onMenuClick={() => setSidebarOpen(true)} />
            <div className="pt-8 mt-8">{children}</div>
          </div>
        </ToastProvider>
      </SessionProvider>
    </div>
  );
}
