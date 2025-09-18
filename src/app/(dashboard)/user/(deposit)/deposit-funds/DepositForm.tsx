"use client";

import { createDeposit } from "@/lib/actions/deposit.action";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";

export default function DepositForm() {
  const { showToast } = useToast();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createDeposit({
        amount: Number(amount),
        point: Number(amount), // example conversion
        depositType: "wallet",
        transactionId,
        proofPic: proofUrl
          ? { imageUrl: proofUrl, publicUrl: publicId ?? "" }
          : undefined,
      });
      console.log({ result });
      if (result.success) {
        console.log("Deposit submitted!");
        showToast("Deposite Success", "success");
        router.push("/user/deposit-history");
        // console.log("Deposit saved:", result.deposit);
      } else {
        showToast(result.message, "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || "Failed to submit deposit.", "error");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Deposit Funds
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          <div className="flex-1 flex-row">
            <label className="block text-gray-700 font-medium mb-2">
              Proof
            </label>
            <CldUploadWidget
              uploadPreset="school1" // from your Cloudinary settings
              onSuccess={(result: any, { widget }) => {
                setProofUrl(result.info.secure_url);
                setPublicId(result.info.public_id);
                widget.close();
              }}
            >
              {({ open }) => {
                return (
                  <div
                    className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                    onClick={() => open()}
                  >
                    <Image src="/upload.png" alt="" width={28} height={28} />
                    <span>
                      {proofUrl ? "File uploaded ✅" : "Upload a photo"}
                    </span>
                  </div>
                );
              }}
            </CldUploadWidget>

            {proofUrl && (
              <Image
                src={proofUrl}
                alt="Proof Preview"
                width={100}
                height={100}
                className="mt-2 rounded-lg border"
              />
            )}
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

        {/* Submit */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
