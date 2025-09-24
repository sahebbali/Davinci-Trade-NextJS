import { getCurrentUser } from "@/lib/getCurrentUser";
import EditProfileForm from "./EditProfileForm";

export default async function EditProfilePage() {
  const userDoc = await getCurrentUser(); // ✅ Fetch user data on server (SSR)

  if (!userDoc) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 dark:text-gray-300">
          You must be logged in to edit your profile.
        </p>
      </main>
    );
  }
  const user = {
    userId: userDoc.userId,
    fullName: userDoc.fullName,
    email: userDoc.email,
    phone: userDoc.mobile || "",
    address: userDoc.address || "",
    avatar: userDoc.avatar || "",
    role: userDoc.role,
  };
  return <EditProfileForm user={user} />;
}
