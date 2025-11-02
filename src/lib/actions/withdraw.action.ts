"use server";

import { connectToDatabase } from "../db";
import Withdraw, { IWithdraw, WithdrawType } from "../db/models/withdraw.model";

import { getCurrentUser } from "../getCurrentUser";

interface CreateWithdrawProps {
  amount: number;
}

interface CreateWithdrawProps {
  amount: number;
  withdrawType: WithdrawType;
  paymentInfo?: IWithdraw["paymentInfo"];
}

export async function createWithdraw(data: CreateWithdrawProps) {
  try {
    await connectToDatabase();
    console.log(data);
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not authenticated");

    if (data.amount < 10) throw new Error("Amount must be at least 10");

    const withdraw = new Withdraw({
      userId: currentUser.userId,
      fullName: currentUser.fullName || "",
      requestAmount: Number(data.amount),
      withdrawType: data.withdrawType,
      withdrawCharge: 10,
      withdrawId: `WITH${Date.now()}`,
      paymentInfo: data.paymentInfo || {},
      status: "pending",
      //   date: new Date().toLocaleDateString(),
      //   time: new Date().toLocaleTimeString(),
    });

    await withdraw.save();

    return {
      success: true,
      message: "Withdraw request created successfully",
      //   withdraw: savedWithdraw.toObject(),
    };
  } catch (error: any) {
    console.error("Error creating withdraw:", error.message || error);
    throw new Error(error.message || "Failed to create withdraw request");
  }
}

export async function getAllWithdrawHistoryAdmin(
  page = 1,
  limit = 10,
  search = "",
  fromDate = null,
  toDate = null,
  status = ""
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
    if (status && status.trim()) {
      query.status = status;
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
      Withdraw.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Withdraw.countDocuments(query),
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
