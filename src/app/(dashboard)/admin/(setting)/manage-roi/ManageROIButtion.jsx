"use client";

import { useToast } from "@/components/ToastProvider";
import { useState } from "react";

export default function ManageROIButton() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRunROI = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/scheduled/roi", {
        method: "POST",
      });
      const data = await res.json();
      showToast(data.message);
    } catch (err) {
      showToast("Something went wrong while running ROI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105">
      <button
        onClick={handleRunROI}
        disabled={loading}
        className={`px-6 py-3 rounded-xl font-semibold text-white transition ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Running ROI..." : "Run ROI Process"}
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
}
