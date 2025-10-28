"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  FiX,
} from "react-icons/fi";
import { FaBriefcase } from "react-icons/fa";
import { MdFlipCameraAndroid } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import { GiProfit } from "react-icons/gi";
import { FaPersonBooth } from "react-icons/fa";
import { FaPersonDotsFromLine } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import { MdBrowserNotSupported } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { FaPersonRays } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";

import { useSession } from "next-auth/react";

const menuItems = [
  {
    title: "Dashboard",
    icon: <MdDashboardCustomize size={18} />,
    label: "Dashboard",
    href: "/user",
    visible: ["user"],
  },
  {
    title: "Profile",
    icon: <FiUserCheck size={18} />,
    items: [
      {
        icon: <FiUser size={16} />,
        label: "View Profile",
        href: "/user/view-profile",
        visible: ["user"],
      },
      {
        icon: <FiEdit size={16} />,
        label: "Edit Profile",
        href: "/user/edit-profile",
        visible: ["user"],
      },
      {
        icon: <FiLock size={16} />,
        label: "Change Password",
        href: "/user/change-password",
        visible: ["user"],
      },
      {
        icon: <FiCreditCard size={16} />,
        label: "Add Wallet",
        href: "/user/add-wallet",
        visible: ["user"],
      },
    ],
  },
  {
    title: "My Partner",
    icon: <FaPersonRays size={18} />,
    items: [
      {
        icon: <FaPersonDotsFromLine size={16} />,
        label: "Referral Partners",
        href: "/user/level-one",
        visible: ["user"],
      },
      {
        icon: <FaUsers size={16} />,
        label: "Level Partners",
        href: "/user/level",
        visible: ["user"],
      },
    ],
  },
  {
    title: "TOP Up",
    icon: <FaPersonBooth size={18} />,
    items: [
      {
        icon: <FaPersonDotsFromLine size={16} />,
        label: "TOP Up Amount",
        href: "/user/top-up",
        visible: ["user"],
      },
      {
        icon: <FaUsers size={16} />,
        label: "TOP Up History",
        href: "/user/top-up-history",
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
        label: "My Wallet",
        href: "/user/my-wallet",
        visible: ["user"],
      },
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
        href: "/user/withdraw-funds",
        visible: ["user"],
      },
      {
        icon: <FiClock size={16} />,
        label: "Withdraw History",
        href: "/user/withdraw-history",
        visible: ["user"],
      },
    ],
  },
  {
    title: "Earning",
    icon: <FaBriefcase size={18} />,
    items: [
      {
        icon: <MdFlipCameraAndroid size={16} />,
        label: "ROI Income",
        href: "/user/roi-income",
        visible: ["user"],
      },
      {
        icon: <SiLevelsdotfyi size={16} />,
        label: "Level Income",
        href: "/user/level-income",
        visible: ["user"],
      },
      {
        icon: <GiProfit size={16} />,
        label: "Profit Sharing",
        href: "/user/profit-sharing",
        visible: ["user"],
      },
    ],
  },
  {
    title: "Support",
    icon: <MdSupportAgent size={18} />,
    items: [
      {
        icon: <MdOutlineContactSupport size={16} />,
        label: "Add Support Ticket",
        href: "/user/add-ticket",
        visible: ["user"],
      },
      {
        icon: <MdBrowserNotSupported size={16} />,
        label: "My Support Tickets",
        href: "/user/my-tickets",
        visible: ["user"],
      },
      {
        icon: <GrUpdate size={16} />,
        label: "Update",
        href: "/user/update",
        visible: ["user"],
      },
    ],
  },
];

interface MenuProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Menu = ({ sidebarOpen, setSidebarOpen }: MenuProps) => {
  const { data: session } = useSession();
  const role = session?.user?.role || "user";
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (title: string) => {
    setActiveSection(activeSection === title ? null : title);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-white shadow-md transform transition-transform duration-300 z-50
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:static flex flex-col`}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b lg:hidden">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto p-4 text-sm">
          {menuItems.map((section) => (
            <div key={section.title} className="mb-2">
              {/* If section has nested items */}
              {section.items ? (
                <>
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

                  {activeSection === section.title && (
                    <div className="flex flex-col gap-1 mt-1 ml-6">
                      {section.items.map(
                        (item) =>
                          item.visible.includes(role) && (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => setSidebarOpen(false)}
                              className={`flex items-center gap-3 py-2 px-2 rounded-md transition-colors
                    ${
                      pathname === item.href
                        ? "bg-purple-100 text-purple-600 font-medium"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                            >
                              {item.icon}
                              <span>{item.label}</span>
                            </Link>
                          )
                      )}
                    </div>
                  )}
                </>
              ) : (
                // If section is a single link (like Dashboard)
                section.visible.includes(role) && (
                  <Link
                    href={section.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 py-2 px-2 rounded-md transition-colors
          ${
            pathname === section.href
              ? "bg-purple-100 text-purple-600 font-medium"
              : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
          }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
