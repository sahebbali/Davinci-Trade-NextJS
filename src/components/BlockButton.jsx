"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleBlockUser } from "@/lib/actions/user.actions";
import { useToast } from "./ToastProvider";

export default function BlockButton({ userId, isActive }) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      const res = await toggleBlockUser(userId);
      showToast(res.message, res.success ? "success" : "error");
      router.refresh(); // ✅ refresh the page data without reload
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={`text-white px-3 py-1 rounded text-sm transition-all duration-200 cursor-pointer ${
        isActive
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {isPending ? "Please wait..." : isActive ? "Block" : "Unblock"}
    </button>
  );
}
