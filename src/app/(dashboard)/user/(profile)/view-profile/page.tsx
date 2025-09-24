// app/profile/page.tsx

"use client";

import { useState } from "react";
import {
  FaUserCircle,
  FaIdCard,
  FaUserFriends,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLink,
  FaClipboard,
} from "react-icons/fa";
import { FiEdit } from "react-icons/fi"; // For a potential edit button

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
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-gray-700 dark:to-gray-900 p-8 text-center sm:p-10">
          <div className="flex justify-center mb-4">
            <FaUserCircle className="text-white text-7xl sm:text-8xl p-1 bg-blue-500 dark:bg-gray-600 rounded-full border-4 border-white dark:border-gray-800" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            {profile.fullName}
          </h1>
          <p className="text-blue-100 dark:text-gray-300 text-lg">
            User ID: <span className="font-semibold">{profile.userId}</span>
          </p>
          {/* <button className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors">
            <FiEdit className="h-6 w-6" />
          </button> */}
        </div>

        {/* Profile Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <Section title="Personal Information">
            <DetailItem
              icon={<FaEnvelope />}
              label="Email"
              value={profile.email}
            />
            <DetailItem
              icon={<FaPhone />}
              label="Phone"
              value={profile.phone}
            />
            <DetailItem
              icon={<FaMapMarkerAlt />}
              label="Address"
              value={profile.address}
            />
          </Section>

          <Section title="Sponsorship Details">
            <DetailItem
              icon={<FaUserFriends />}
              label="Sponsor Name"
              value={profile.sponsorName}
            />
            <DetailItem
              icon={<FaIdCard />}
              label="Sponsor ID"
              value={profile.sponsorId}
            />
          </Section>

          {/* Referral Link */}
          <Section title="Referral Link">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-grow">
                <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  readOnly
                  value={profile.referralLink}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center px-5 py-2.5 rounded-lg font-semibold text-white transition-all duration-200 shadow-md
                  ${
                    copied
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                <FaClipboard className="mr-2" />{" "}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Share this link to invite others and earn rewards!
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

// Reusable components for cleaner code
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
      <div className="text-lg text-blue-500 dark:text-blue-400">{icon}</div>
      <div>
        <span className="font-medium">{label}:</span> {value}
      </div>
    </div>
  );
}
