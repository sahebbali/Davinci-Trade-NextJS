"use client";

import { useState, useTransition } from "react";
import { updateDepositStatus } from "@/lib/actions/deposit.action";

export default function DepositStatusSelect({ id, currentStatus, type }) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    startTransition(async () => {
      await updateDepositStatus(id, newStatus);
    });
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending}
      className={`border rounded px-2 py-1 text-sm ${
        status.toLowerCase() === "approved"
          ? "bg-green-100 text-green-600"
          : status.toLowerCase() === "rejected"
          ? "bg-red-100 text-red-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      <option value="Pending">Pending</option>
      <option value="Approved">Approved</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
}
