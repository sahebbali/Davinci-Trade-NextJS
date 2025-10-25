"use server";

import { connectToDatabase } from "../db";
import { getCurrentUser } from "../getCurrentUser";
import PackageBuyInfo from "../db/models/PackageBuyInfo.model";
import Wallet from "../db/models/wallet.model";
import { generateUniqueTOPUPID, updateMultipleWalletBalances } from "../helper";

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

    const { depositBalance = 0 } =
      (await Wallet.findOne({
        userId: currentUser.userId,
      })) || {};
    // console.log("Deposit Balance:", depositBalance);
    // ✅ Basic validation
    if (!data.packageAmount) {
      throw new Error("Missing required fields: packageAmount");
    }
    if (data.packageAmount <= 0) {
      throw new Error("Package amount must be greater than zero");
    }
    if (depositBalance < data.packageAmount) {
      throw new Error("Insufficient deposit balance");
    }

    const returnRate = 5; // Example return rate multiplier
    // ✅ Create new document
    await PackageBuyInfo.create({
      ...data,
      userId: currentUser?.userId,
      fullName: currentUser?.fullName,
      sponsorId: currentUser?.sponsorId || "default-sponsor-id",
      sponsorName: currentUser?.sponsorName || "Default Sponsor",
      packageLimit: data.packageLimit || data.packageAmount * returnRate,
      packageId: generateUniqueTOPUPID(),
      packageAmount: data.packageAmount,
      totalReturnedAmount: 0,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      startDate: new Date().toISOString(),
      startDateInt: Date.now(),
      status: "pending",
      isActive: true,
    });

    updateMultipleWalletBalances(currentUser.userId, {
      depositBalance: -data.packageAmount,
      selfInvestment: data.packageAmount,
    });
    // ✅ Convert to plain object (Next.js safe)

    return {
      success: true,
      message: "Package purchase successfully",
    };
  } catch (error: any) {
    console.error("Error creating package buy info:", error);
    return { success: false, message: error.message };
  }
}

export async function getPackageBuyInfo(page: number = 1, limit: number = 10) {
  try {
    // ✅ Ensure page and limit are positive integers
    page = Math.max(1, Number(page));
    limit = Math.max(1, Number(limit));
    const skip = (page - 1) * limit;

    // ✅ Get authenticated user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // ✅ Connect to MongoDB
    await connectToDatabase();

    // ✅ Fetch paginated package buy info
    const packageBuyInfos = await PackageBuyInfo.find({
      userId: currentUser.userId,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // ✅ Count total documents
    const total = await PackageBuyInfo.countDocuments({
      userId: currentUser.userId,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: packageBuyInfos,

      total,
      page,
      limit,
      totalPages,
    };
  } catch (error: any) {
    console.error("❌ Error fetching package buy info:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch package buy info",
    };
  }
}
