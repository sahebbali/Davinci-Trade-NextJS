"use client";

import { useState } from "react";
import { useToast } from "@/components/ToastProvider";
import { createWithdraw } from "@/lib/actions/withdraw.action";

export default function WithdrawPage() {
  const { showToast } = useToast();
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      showToast("Enter a valid amount", "error");
      return;
    }

    if (!wallet.trim()) {
      showToast("Enter your wallet address", "error");
      return;
    }

    setSubmitting(true);

    try {
      console.log("amount:", amount, "wallet:", wallet);
      const data = {
        amount,
        withdrawType: "bank",
        paymentInfo: {
          bankName: "city bank",
          accountNumber: "1234567890",
        },
      };
      const res = await createWithdraw(data);
      // Replace this with your API call
      //   const res = await fetch("/api/withdraw", {
      //     method: "POST",
      //     body: JSON.stringify({ amount: Number(amount), wallet }),
      //     headers: { "Content-Type": "application/json" },
      //   });

      //   const data = await res.json();
      console.log(res);

      if (res.success) {
        showToast("Withdrawal request submitted ✅", "success");
        setAmount("");
      } else {
        showToast(res.message || "Failed to withdraw ❌", "error");
      }
    } catch (err) {
      console.error(err);
      showToast(err.message || "Something went wrong ❌", "error");
    }

    setSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Withdrawable Balance Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 text-white rounded-2xl shadow-lg p-6 mb-8 text-center">
          <p className="text-sm font-medium uppercase opacity-90">
            Withdrawable Balance
          </p>
          <p className="text-4xl font-bold mt-2">$5000</p>
        </div>

        {/* Withdraw Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Wallet Address
              </label>
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="Enter your wallet address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition ${
                submitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {submitting ? "Submitting..." : "Withdraw"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
