"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.jpg" // Make sure logo.jpg is in public/
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/signin"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile menu placeholder */}
        <div className="md:hidden">
          {/* You can add hamburger menu here if needed */}
        </div>
      </div>
    </header>
  );
}
