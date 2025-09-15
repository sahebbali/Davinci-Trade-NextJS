"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiEdit,
  FiLock,
  FiCreditCard,
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiClock,
  FiChevronRight,
  FiUserCheck,
  FiDownload,
  FiUpload,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Profile",
    icon: <FiUserCheck size={18} />,
    items: [
      {
        icon: <FiUser size={16} />,
        label: "View Profile",
        href: "/view-profile",
        visible: ["user"],
      },
      {
        icon: <FiEdit size={16} />,
        label: "Edit Profile",
        href: "/edit-profile",
        visible: ["user"],
      },
      {
        icon: <FiLock size={16} />,
        label: "Change Password",
        href: "/change-password",
        visible: ["user"],
      },
      {
        icon: <FiCreditCard size={16} />,
        label: "Add Wallet",
        href: "/add-wallet",
        visible: ["user"],
      },
    ],
  },
  {
    title: "Deposit",
    icon: <FiDownload size={18} />,
    items: [
      {
        icon: <FiArrowDownCircle size={16} />,
        label: "Deposit Funds",
        href: "/user/deposit-funds",
        visible: ["user"],
      },
      {
        icon: <FiClock size={16} />,
        label: "Deposit History",
        href: "/user/deposit-history",
        visible: ["user"],
      },
    ],
  },
  {
    title: "Withdraw",
    icon: <FiUpload size={18} />,
    items: [
      {
        icon: <FiArrowUpCircle size={16} />,
        label: "Withdraw Funds",
        href: "/withdraw-funds",
        visible: ["user"],
      },
      {
        icon: <FiClock size={16} />,
        label: "Withdraw History",
        href: "/withdraw-history",
        visible: ["user"],
      },
    ],
  },
];

const Menu = () => {
  const role = "user";
  const pathname = usePathname(); // ✅ current route
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setActiveSection(activeSection === title ? null : title);
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div key={section.title} className="mb-2">
          {/* Section Title */}
          <button
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between px-2 py-2 text-gray-700 font-medium rounded-md hover:bg-purple-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              {section.icon}
              {section.title}
            </span>
            <FiChevronRight
              className={`transition-transform ${
                activeSection === section.title ? "rotate-90" : ""
              }`}
            />
          </button>

          {/* Menu Items */}
          {activeSection === section.title && (
            <div className="flex flex-col gap-1 mt-1 ml-6">
              {section.items.map((item) =>
                item.visible.includes(role) ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 py-2 px-2 rounded-md transition-colors
                      ${
                        pathname === item.href
                          ? "bg-purple-100 text-purple-600 font-medium" // ✅ active style
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : null
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Menu;
