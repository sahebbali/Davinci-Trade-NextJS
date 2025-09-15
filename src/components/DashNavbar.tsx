"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { FiMenu } from "react-icons/fi"; // Import the hamburger icon

// Define props for DashNavbar
interface DashNavbarProps {
  onMenuClick?: () => void; // Optional function to open the sidebar
}

const DashNavbar = ({ onMenuClick }: DashNavbarProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: "John Doe",
    role: "Admin", // Changed to Admin for demonstration
    avatar: "/images/avatar-1.jpg", // Make sure this path is correct or use an external URL
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: Implement your actual logout logic here (e.g., Clerk, NextAuth, custom API call)
    alert("User logged out (simulated)."); // For demonstration
  };

  // Close dropdown when clicking outside
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

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm relative z-30">
      {/* Mobile Menu Button (Hamburger) */}
      <button className="lg:hidden p-2 text-gray-600" onClick={onMenuClick}>
        <FiMenu size={24} />
      </button>

      {/* SEARCH BAR */}
      {/* Hidden on small screens, shown from md breakpoint */}
      <div className="hidden md:flex flex-grow max-w-md items-center gap-2 text-sm rounded-full ring-1 ring-gray-300 px-3 py-2 bg-gray-50 focus-within:ring-blue-500 transition-all duration-200">
        <CiSearch size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none text-sm bg-transparent flex-grow placeholder-gray-400"
        />
      </div>

      {/* Spacer for better alignment when search is hidden on mobile */}
      <div className="flex-grow md:hidden" />

      {/* ICONS AND USER */}
      <div className="flex items-center gap-4">
        {/*
        // Optional: Message and Notification Icons (uncomment if needed)
        <div className="hidden sm:flex bg-gray-100 rounded-full w-9 h-9 items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
          <Image src="/message.png" alt="message" width={20} height={20} />
        </div>
        <div className="hidden sm:flex bg-gray-100 rounded-full w-9 h-9 items-center justify-center cursor-pointer relative hover:bg-gray-200 transition-colors">
          <Image
            src="/announcement.png"
            alt="notifications"
            width={20}
            height={20}
          />
          <div className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-[10px] font-bold">
            1
          </div>
        </div>
        */}

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Image
            src={user.avatar}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500 transition-all duration-200"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fade-in-down">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-800">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-b-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
