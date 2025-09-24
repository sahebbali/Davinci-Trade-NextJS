// app/profile/page.tsx

"use client";

import { useState } from "react";

export default function ViewProfilePage() {
  const [copied, setCopied] = useState(false);

  const profile = {
    userId: "USR123456",
    fullName: "Saheb Rahman",
    sponsorId: "SPN789101",
    sponsorName: "Rafiq Ahmed",
    email: "saheb@example.com",
    phone: "+8801234567890",
    address: "123 Gulshan Avenue, Dhaka, Bangladesh",
    referralLink: "https://yourapp.com/register?ref=USR123456",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          👤 Profile Overview
        </h1>

        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li>
            <strong>User ID:</strong> {profile.userId}
          </li>
          <li>
            <strong>Full Name:</strong> {profile.fullName}
          </li>
          <li>
            <strong>Sponsor ID:</strong> {profile.sponsorId}
          </li>
          <li>
            <strong>Sponsor Name:</strong> {profile.sponsorName}
          </li>
          <li>
            <strong>Email:</strong> {profile.email}
          </li>
          <li>
            <strong>Phone:</strong> {profile.phone}
          </li>
          <li>
            <strong>Address:</strong> {profile.address}
          </li>
        </ul>

        <div className="mt-6">
          <label className="block text-sm font-medium mb-2">
            Referral Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={profile.referralLink}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
