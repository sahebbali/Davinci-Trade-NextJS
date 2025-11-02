"use client";

import { useState, useTransition } from "react";
import { updateDepositStatus } from "@/lib/actions/deposit.action";
import { useToast } from "./ToastProvider";
import { updateWithdrawStatus } from "@/lib/actions/withdraw.action";

export default function DepositStatusSelect({ id, currentStatus, type }) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    if (type === "deposit") {
      startTransition(async () => {
        const res = await updateDepositStatus(id, newStatus);
        showToast(res.message, res.success ? "success" : "error");
      });
    } else if (type === "withdraw") {
      startTransition(async () => {
        // Assuming there's a similar function for updating withdraw status
        const res = await updateWithdrawStatus(id, newStatus);
        showToast(res.message, res.success ? "success" : "error");
      });
    }
  };
  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending || status === "succeed" || status === "rejected"}
      className={`border rounded px-2 py-1 text-sm ${
        status.toLowerCase() === "succeed"
          ? "bg-green-100 text-green-600"
          : status.toLowerCase() === "rejected"
          ? "bg-red-100 text-red-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      <option value="pending">Pending</option>
      <option value="succeed">Approved</option>
      <option value="rejected">Rejected</option>
    </select>
  );
}
