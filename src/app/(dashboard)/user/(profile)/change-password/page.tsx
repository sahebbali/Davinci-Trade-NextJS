"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      formData.newPassword !== formData.confirmPassword
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    // Show OTP input field
    setShowOtp(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          🔐 Change Password
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Update Password
            </button>
          </div>

          {showOtp && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                OTP Code
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter OTP"
              />
              <button
                type="button"
                onClick={() => alert("OTP submitted")}
                className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Submit OTP
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
