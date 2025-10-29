import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import User from "@/lib/db/models/user.model";

// ✅ Enable Incremental Static Regeneration (ISR)
export const revalidate = 60; // page revalidates every 60 seconds

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    // Parse query params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    // Fetch deposits with pagination
    const [Users, total] = await Promise.all([
      User.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: Users,
      total,
      page,
      limit,
    });
  } catch (error: any) {
    console.error("Error fetching deposits:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
