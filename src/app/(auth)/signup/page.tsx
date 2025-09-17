"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Select from "react-select"; // Using react-select for better country dropdown

// Mock country data - in a real app, you'd fetch this or use a library
const countryOptions = [
  { value: "US", label: "United States (+1)" },
  { value: "CA", label: "Canada (+1)" },
  { value: "GB", label: "United Kingdom (+44)" },
  { value: "AU", label: "Australia (+61)" },
  { value: "IN", label: "India (+91)" },
  { value: "DE", label: "Germany (+49)" },
  { value: "FR", label: "France (+33)" },
  { value: "JP", label: "Japan (+81)" },
  { value: "BR", label: "Brazil (+55)" },
  // Add more countries as needed
];

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]); // Default to US
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Simulate API call
    try {
      console.log("Signing up with:", {
        firstName,
        lastName,
        email,
        password,
        countryCode: selectedCountry?.value,
        phoneNumber: `${
          selectedCountry?.label.split("(")[1].split(")")[0]
        }${phoneNumber}`, // Example of combining country code
        sponsorId,
      });
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      alert("Account created successfully! Please sign in.");
      // Optionally redirect to login page
      // router.push('/signin');
    } catch (err) {
      setError(
        "An unexpected error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Sign Up | DaVinci-Trade</title>
        <meta
          name="description"
          content="Create a new DaVinci-Trade account."
        />
      </Head>

      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 drop-shadow-sm">
            Join DaVinci-Trade
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            Start your journey with intelligent trading.
            <br />
            Or{" "}
            <Link
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              sign in to an existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-6">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <div className="w-1/3 z-10">
                  {" "}
                  {/* Ensure z-index for dropdown */}
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(option) => setSelectedCountry(option as any)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    instanceId="country-select"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        border: "1px solid #D1D5DB",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#BFDBFE", // blue-200 on hover
                        },
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 9999, // High z-index to appear above other elements
                      }),
                    }}
                  />
                </div>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel-national"
                  required
                  className="flex-1 block w-full px-4 py-2 border border-gray-300 rounded-r-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200 -ml-px" // -ml-px to make border merge
                  placeholder="e.g., 770 123 4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="sponsor-id"
                className="block text-sm font-medium text-gray-700"
              >
                Sponsor ID (Optional)
              </label>
              <input
                id="sponsor-id"
                name="sponsorId"
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200"
                placeholder="Your sponsor's ID (if any)"
                value={sponsorId}
                onChange={(e) => setSponsorId(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-semibold rounded-md text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
