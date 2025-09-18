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
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    await connectToDatabase();

    const deposit = new Deposit({
      userId: user.userId,
      fullName: user.fullName || "Saheb", // make sure you use fullName from session
      amount: data.amount,
      point: data.point,
      depositType: data.depositType,
      depositId: data.depositId || `DEP${Date.now()}`,
      transactionId: data.transactionId,
      tid: data.tid,
      proofPic: data.proofPic,
      status: "pending",
    });

    const savedDeposit = await deposit.save();

    // ✅ Convert to plain object before returning
    return savedDeposit.toObject();
  } catch (error: any) {
    console.error("Error creating deposit:", error.message || error);
    throw new Error(error.message || "Failed to create deposit");
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
