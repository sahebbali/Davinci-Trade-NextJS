import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null; // Not logged in
  }
  console.log("current session", { session });

  return {
    id: session.user.id,
    userId: session.user.userId || "",
    fullName: session.user.fullName || "",
    email: session.user.email || "",
    role: session.user.role || "",
  };
}
