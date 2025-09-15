"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

const DashNavbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = {
    name: "John Doe",
    role: "User",
    avatar: "/images/avatar-1.jpg",
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // your logout logic here (Clerk, NextAuth, custom, etc.)
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
  console.log({ user });
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 shadow-sm">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-gray-300 px-2 py-1 bg-white">
        <CiSearch size={14} />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none text-xs bg-transparent"
        />
      </div>

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        {/* <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="message" width={18} height={18} />
        </div>
        <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer relative">
          <Image
            src="/announcement.png"
            alt="notifications"
            width={18}
            height={18}
          />
          <div className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-purple-500 text-white rounded-full text-[10px]">
            1
          </div>
        </div> */}

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Image
            src={user.avatar}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full cursor-pointer border border-gray-200"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
              <div className="px-3 py-2 border-b">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
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
