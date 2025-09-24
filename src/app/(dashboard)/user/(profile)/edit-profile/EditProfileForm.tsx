"use client";

import Image from "next/image";
import { useToast } from "@/components/ToastProvider";
import { updateProfile } from "@/lib/actions/user.actions";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export default function EditProfileForm({ user }: { user: User }) {
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const [avatarPublicId, setAvatarPublicId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const data = { fullName, email, phone, address, avatar: avatarUrl };
    console.log("Sending:", data);

    const res = await updateProfile(data);

    if (res.success) {
      showToast(res.message, "success");
      console.log("Success:", res.message);
    } else {
      showToast(res.message, "error");
      console.error("Error:", res.message);
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-row items-center  gap-2">
            <label className="block text-gray-700 font-medium mb-2">
              Avatar
            </label>
            <CldUploadWidget
              uploadPreset="school1"
              onSuccess={(result: any, { widget }) => {
                setAvatarUrl(result.info.secure_url);
                setAvatarPublicId(result.info.public_id);
                widget.close();
              }}
            >
              {({ open }) => (
                <div
                  className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-700"
                  onClick={() => open()}
                >
                  <Image src="/upload.png" alt="" width={28} height={28} />
                  <span>
                    {avatarUrl ? "Avatar uploaded ✅" : "Upload avatar"}
                  </span>
                </div>
              )}
            </CldUploadWidget>

            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="Avatar Preview"
                width={100}
                height={100}
                className="mt-2 rounded-full border"
              />
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your full name"
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+8801XXXXXXXXX"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={address}
              rows={3}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your address"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="reset"
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
                saving
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
