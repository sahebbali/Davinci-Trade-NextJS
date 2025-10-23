"use client";
import { useToast } from "@/components/ToastProvider";
import { createPackageBuyInfo } from "@/lib/actions/packageBuyInfoActions";
import { getUserWallet } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";

const TopupPage = () => {
  const { showToast } = useToast();

  const [userId, setUserId] = useState("AB050820250002");
  const [packageAmount, setPackageAmount] = useState("");
  const [selfInvestment, setSelfInvestment] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch wallet once
  useEffect(() => {
    async function fetchWallet() {
      try {
        const wallet = await getUserWallet();
        if (wallet) {
          setSelfInvestment(wallet.selfInvestment || 0);
          setCurrentBalance(wallet.depositBalance || 0);
          console.log("Fetched wallet:", wallet);
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    }

    fetchWallet();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!packageAmount || packageAmount <= 0) {
      alert("Please enter a valid package amount.");
      return;
    }

    setLoading(true);

    const res = await createPackageBuyInfo({
      packageAmount: Number(packageAmount),
      packageType: "top-up",
    });

    setLoading(false);

    if (res.success) {
      showToast("Package created successfully!", "success");

      // ✅ Refresh wallet after package purchase
      try {
        const updatedWallet = await getUserWallet();
        if (updatedWallet) {
          setSelfInvestment(updatedWallet.selfInvestment || 0);
          setCurrentBalance(updatedWallet.depositBalance || 0);
        }
      } catch (err) {
        console.error("Failed to refresh wallet:", err);
      }

      setPackageAmount(""); // reset input
    } else {
      showToast("Error: " + res.message, "error");
    }
  };

  return (
    <div className="max-h-fit flex bg-gray-100 ">
      <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 lg:p-10 w-full border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
            💰 Top-Up Account
          </h1>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-sm text-center">
            Self Investment: ₹ {selfInvestment.toFixed(2)}
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-sm text-center">
            Current Balance: ₹ {currentBalance.toFixed(2)}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                User ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 shadow-sm text-gray-800 cursor-not-allowed focus:outline-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                This is your unique user ID.
              </p>
            </div>

            <div className="flex-1">
              <label
                htmlFor="packageAmount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Package Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  id="packageAmount"
                  value={packageAmount}
                  onChange={(e) => setPackageAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800"
                  required
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-sm sm:text-base rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Processing..." : "🚀 Initiate Top-Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopupPage;
