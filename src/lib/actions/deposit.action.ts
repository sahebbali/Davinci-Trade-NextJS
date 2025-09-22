"use server";
import { connectToDatabase } from "../db";
import Deposit from "../db/models/deposit.model";
import { getCurrentUser } from "../getCurrentUser";

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
export async function updateDepositStatus(
  depositId: string,
  status: "pending" | "succeed" | "rejected"
) {
  try {
    await connectToDatabase();

    const updatedDeposit = await Deposit.findOneAndUpdate(
      { depositId },
      { status },
      { new: true }
    );

    return updatedDeposit;
  } catch (error) {
    console.error("Error updating deposit status:", error);
    throw new Error("Failed to update deposit");
  }
}
