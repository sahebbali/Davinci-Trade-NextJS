"use server";
import { number } from "zod";
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

    const savedWithdraw = await withdraw.save();

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
