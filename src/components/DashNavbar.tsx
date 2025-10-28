"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FiMenu } from "react-icons/fi"; // Hamburger menu
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface DashNavbarProps {
  onMenuClick?: () => void; // Function to toggle sidebar
}

const DashNavbar = ({ onMenuClick }: DashNavbarProps) => {
  const { data: session, status } = useSession();
  console.log("DashNavbar session", { session });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock user data
  const user = {
    name: "John Doe",
    role: "Admin",
    avatar: "/images/avatar-1.jpg", // Replace with real avatar
  };
  const userName = session?.user?.fullName || "Guest User";
  const userRole = session?.user?.role || "User";
  const userAvatar = session?.user?.image || "/images/default-avatar.png"; // Use a default avatar if none from session

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true, // redirect after logout
        callbackUrl: "/signin", // where to go after logout
      });
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return (
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm z-50 animate-pulse">
        <div className="lg:hidden w-8 h-8 bg-gray-200 rounded"></div>
        <div className="hidden md:block w-48 h-6 bg-gray-200 rounded"></div>
        <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
      </div>
    );
  }
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm z-50">
      {/* Sidebar toggle (mobile only) */}
      <button
        className="lg:hidden p-2 text-gray-600 hover:text-blue-600 transition"
        onClick={onMenuClick}
      >
        <FiMenu size={24} />
      </button>

      <h1 className="hidden md:block text-xl font-bold text-gray-800">
        {userName || "Dashboard"}
      </h1>

      {/* User avatar + dropdown */}
      <div className="relative" ref={dropdownRef}>
        <Image
          src={userAvatar}
          alt="avatar"
          width={36}
          height={36}
          className="rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-200"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fade-in-down">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>

            {/* Dropdown Links */}
            <div className="py-2">
              <Link
                href="/user/profile"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashNavbar;
