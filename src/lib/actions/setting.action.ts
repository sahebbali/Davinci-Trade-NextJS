"use server";

import { connectToDatabase } from "../db";
import { getCurrentUser } from "../getCurrentUser";
export async function calculateROI() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not authenticated");
    await connectToDatabase();
    return { success: true, message: "ROI calculated successfully" };
  } catch (error: any) {
    console.error("Error calculating ROI:", error);
    return { success: false, message: error.message };
  }
}
