import { connectToDatabase } from "@/lib/db";
import PackageBuyInfo from "@/lib/db/models/PackageBuyInfo.model";
import { NextResponse } from "next/server";
// import handleFirstROI from '@/lib/handleFirstROI';

export async function GET(request) {
  // Optional: Verify the request is from your cron service
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // await handleFirstROI();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST() {

  try {
    await connectToDatabase();
   const activePackages = await PackageBuyInfo.find({
      isActive: true,
      // isFirstROI: true,
      // startDateInt: { $lte: dateInt },
      // isROIFree: false,
      // status: "success",
    });
    console.log({ activePackages });
    console.log(`Total active packages: ${activePackages.length}`);

    if (activePackages.length === 0) {
      console.log("No eligible packages for ROI distribution.");
      return;
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
