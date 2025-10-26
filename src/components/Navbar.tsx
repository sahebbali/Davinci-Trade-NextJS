"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  console.log("nav session", { session });
  const [isOpen, setIsOpen] = useState(false);
  const role = session?.user?.role;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                DaVinci-Trade
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link href="#features" className="nav-link">
                Features
              </Link>
              <Link href="#how-it-works" className="nav-link">
                How It Works
              </Link>
              <Link href="#testimonials" className="nav-link">
                Testimonials
              </Link>
              <Link href="#contact" className="nav-link">
                Contact
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {status === "loading" ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : session ? (
              <>
                <Link
                  href={role === "admin" ? "/admin" : "/user"}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mr-2"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 mr-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="#features" className="mobile-link">
              Features
            </Link>
            <Link href="#how-it-works" className="mobile-link">
              How It Works
            </Link>
            <Link href="#testimonials" className="mobile-link">
              Testimonials
            </Link>
            <Link href="#contact" className="mobile-link">
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {session ? (
              <div className="px-4 space-y-2">
                <Link
                  href="/dashboard"
                  className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Dashboard
                </Link>
                <Link
                  href="/api/auth/signout"
                  className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="px-4 space-y-2">
                <Link
                  href="/signin"
                  className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
