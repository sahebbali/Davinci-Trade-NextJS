"use server";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth/next";
import User from "./db/models/user.model";
import { connectToDatabase } from "./db";

/*************  ✨ Windsurf Command 🌟  *************/
export async function getCurrentUser() {
  await connectToDatabase();

  const session = await getServerSession(authOptions);

  if (!session?.user) return null; // Not logged in

  const currentUser = await User.findOne({ userId: session.user.userId });
  if (!currentUser) {
    session.destroy();
    return;
  } // User not found
  // console.log({ currentUser });

  return {
    id: currentUser._id || "",
    userId: currentUser.userId || "",
    fullName: currentUser.fullName || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    address: currentUser.address || "",
    role: currentUser.role || "",
  };
}
