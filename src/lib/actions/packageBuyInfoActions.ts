"use server";

import { connectToDatabase } from "../db";
import { getCurrentUser } from "../getCurrentUser";
import PackageBuyInfo from "../db/models/PackageBuyInfo.model";

export async function createPackageBuyInfo(data: {
  userId?: string;
  userFullName?: string;
  sponsorId?: string;
  sponsorName?: string;
  packageId?: string;
  packageAmount: number;
  packageLimit?: number;
  packageType?: string;
  upgradedAmount?: number;
  isAdmin?: boolean;
}) {
  try {
    // ✅ Optional authentication check
    const currentUser = await getCurrentUser();
    console.log({ currentUser });
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // ✅ Connect to database
    await connectToDatabase();

    // ✅ Basic validation
    if (!data.packageAmount) {
      throw new Error("Missing required fields: packageAmount");
    }
    const returnRate = 5; // Example return rate multiplier
    // ✅ Create new document
    const newPackage = await PackageBuyInfo.create({
      ...data,
      userId: currentUser?.userId,
      fullName: currentUser?.fullName,
      sponsorId: currentUser?.sponsorId || "default-sponsor-id",
      sponsorName: currentUser?.sponsorName || "Default Sponsor",
      packageLimit: data.packageLimit || data.packageAmount * returnRate,
      packageId: "default-package-id",
      packageAmount: data.packageAmount,
      totalReturnedAmount: 0,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      startDate: new Date().toISOString(),
      startDateInt: Date.now(),
      status: "pending",
    });

    // ✅ Convert to plain object (Next.js safe)

    return {
      success: true,
      message: "Package purchase successfully",
      data: newPackage,
    };
  } catch (error: any) {
    console.error("Error creating package buy info:", error);
    return { success: false, message: error.message };
  }
}
