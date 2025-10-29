"use client";

import { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FiUserCheck, FiUserX, FiDownload, FiUpload } from "react-icons/fi";
import { MdDashboardCustomize } from "react-icons/md";

/*************  ✨ Windsurf Command ⭐  *************/
/*******  6fea93b4-2cfd-49c5-8362-104dda19d52f  *******/
export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    totalDeposit: 0,
    totalWithdraw: 0,
  });

  useEffect(() => {
    // 🔹 Fetch stats from your API here
    // Example: /api/admin/dashboard-stats
    // For demo purpose:
    setStats({
      totalUsers: 450,
      activeUsers: 380,
      blockedUsers: 70,
      totalDeposit: 120000,
      totalWithdraw: 95000,
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers size={24} className="text-blue-500" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={<FiUserCheck size={24} className="text-green-500" />}
          color="bg-green-50"
        />
        <StatCard
          title="Blocked Users"
          value={stats.blockedUsers}
          icon={<FiUserX size={24} className="text-red-500" />}
          color="bg-red-50"
        />
        <StatCard
          title="Total Deposit"
          value={`$${stats.totalDeposit.toLocaleString()}`}
          icon={<FiDownload size={24} className="text-purple-500" />}
          color="bg-purple-50"
        />
        <StatCard
          title="Total Withdraw"
          value={`$${stats.totalWithdraw.toLocaleString()}`}
          icon={<FiUpload size={24} className="text-orange-500" />}
          color="bg-orange-50"
        />
      </div>

      {/* Optional Section — Chart or Recent Activities */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity Overview
        </h2>
        <div className="h-40 flex items-center justify-center text-gray-500">
          📊 Chart/Analytics Section (Coming Soon)
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div
      className={`p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ${color} flex flex-col gap-2`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        {icon}
      </div>
      <span className="text-xl font-bold text-gray-800">{value}</span>
    </div>
  );
};
