"use server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db";
import Deposit from "../db/models/deposit.model";
import Wallet from "../db/models/wallet.model";
import { getCurrentUser } from "../getCurrentUser";
import { updateMultipleWalletBalances } from "../helper";

interface CreateDepositProps {
  amount: number;
  point: number;
  depositType: string;
  depositId?: string;
  transactionId?: string;
  transactionHash?: string;
  tid?: string;
  proofPic?: { imageUrl?: string; publicUrl?: string };
}

export async function createDeposit(data: CreateDepositProps) {
  try {
    await connectToDatabase();
    // Get authenticated user
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not authenticated");

    if (data.point < 1) throw new Error("Point must be greater than 0");
    if (data.amount < 10) throw new Error("Amount must be greater than 10");

    const deposit = new Deposit({
      userId: currentUser.userId,
      fullName: currentUser.fullName || "", // make sure you use fullName from session
      email: currentUser.email || "", // make sure you use fullName from session
      amount: data.amount,
      point: data.point,
      depositType: data.depositType,
      depositId: data.depositId || `DEP${Date.now()}`,
      transactionId: data.transactionId,
      tid: data.tid,
      proofPic: data.proofPic,
      status: "pending",
    });

    await deposit.save();

    // ✅ Convert to plain object before returning
    return {
      success: true,
      message: "Deposit created successfully",
      //   deposit: savedDeposit.toObject(), // plain object
    };
  } catch (error: any) {
    console.error("Error creating deposit:", error.message || error);
    throw new Error(error.message || "Failed to create deposit");
  }
}

export async function getUserDepositHistory(page = 1, limit = 10) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    await connectToDatabase();

    // Pagination logic
    const skip = (page - 1) * limit;

    const [deposits, total] = await Promise.all([
      Deposit.find({ userId: user.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Deposit.countDocuments({ userId: user.userId }),
    ]);

    return {
      success: true,
      data: deposits,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("❌ Error fetching deposit history:", error);
    return { success: false, error: "Failed to fetch deposit history" };
  }
}

export async function getUserWallet() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    await connectToDatabase();

    // Pagination logic

    const [deposits] = await Promise.all([
      Wallet.find({ userId: user.userId }),
    ]);

    return {
      success: true,
      data: deposits,
    };
  } catch (error) {
    console.error("❌ Error fetching My wallet:", error);
    return { success: false, error: "Failed to fetch My Wallet " };
  }
}

/**
 * Fetch all deposit histories for admin, with pagination, search, and date range filtering.
 */
export async function getAllDepositsHistoryAdmin(
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
      Deposit.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Deposit.countDocuments(query),
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
    console.error("Error fetching deposits:", error);
    return {
      success: false,
      message: error.message || "Something went wrong while fetching deposits.",
    };
  }
}

export async function updateDepositStatus(
  depositId: string,
  status: "pending" | "succeed" | "rejected"
) {
  console.log(depositId, status);
  try {
    const updated = await Deposit.findOneAndUpdate(
      { depositId: depositId },
      { status },
      { new: true }
    );

    if (updated && status === "succeed") {
      await updateMultipleWalletBalances(updated.userId, {
        depositBalance: updated.amount,
      });
    }

    revalidatePath("/admin/all-deposits"); // refresh page data
    return {
      success: true,
      message: "Deposit status updated successfully",
    };
  } catch (error) {
    console.error("Update deposit status error:", error);
    return { success: false, message: "Failed to update deposit status" };
  }
}
