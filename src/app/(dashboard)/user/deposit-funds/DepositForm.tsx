"use client";

import { useState } from "react";

export default function DepositForm() {
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ amount, transactionId, proofFile });
    alert("Deposit submitted!");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Deposit Funds
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Flex row for inputs */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Amount */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Proof Image */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">
              Proof Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
              className="w-full text-gray-700"
              required
            />
          </div>

          {/* Transaction ID */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">
              Transaction ID
            </label>
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter transaction ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
