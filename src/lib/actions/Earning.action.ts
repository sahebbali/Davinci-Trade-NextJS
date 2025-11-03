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

export async function getAllROIIncomeAdmin(
  page = 1,
  limit = 10,
  search = "",
  fromDate = null,
  toDate = null
) {
  try {
    // ✅ 1. Auth check
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, message: "Unauthorized: Please login first" };
    }
    console.log({ fromDate, toDate });
    await connectToDatabase();

    // ✅ 2. Pagination setup
    const skip = (page - 1) * limit;

    // ✅ 3. Build main query
    const query: Record<string, any> = {};

    // 🔍 Search filter (case-insensitive)
    if (search?.trim()) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { userId: { $regex: search, $options: "i" } },
      ];
    }

    // 📅 Date range filter
    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59, 999)),
      };
    }

    // ✅ 4. Query DB (in parallel for performance)
    const [data, total] = await Promise.all([
      PackageRoi.find(query)
        .select(
          "userId fullName package commissionPercentage commissionAmount incomeDay incomeDate -_id"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      PackageRoi.countDocuments(query),
    ]);

    // ✅ 5. Return structured result
    return {
      success: true,
      data,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
      filterApplied: { search, fromDate, toDate },
    };
  } catch (error: any) {
    console.error("Error fetching Withdraw:", error);
    return {
      success: false,
      message: error.message || "Something went wrong while fetching Withdraw.",
    };
  }
}
