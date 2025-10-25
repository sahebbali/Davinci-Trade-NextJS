"use server";

import { connectToDatabase } from "../db";
import { getCurrentUser } from "../getCurrentUser";
import { PackageRoi } from "../db/models/PackageROI.model";

export async function getAllROIIncome(page: number = 1, limit: number = 10) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not authenticated");

    await connectToDatabase();

    const skip = (page - 1) * limit;

    // Fetch paginated tickets
    const ROIIncome = await PackageRoi.find({ userId: currentUser.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // converts Mongoose docs to plain JS objects

    // Count total tickets for pagination
    const total = await PackageRoi.countDocuments({
      userId: currentUser.userId,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: ROIIncome,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
