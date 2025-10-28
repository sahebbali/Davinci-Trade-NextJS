"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        callbackUrl: "/signin",
      });
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out cursor-pointer"
    >
      Logout
    </button>
  );
}
