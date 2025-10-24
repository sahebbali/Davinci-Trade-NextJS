import { connectToDatabase } from "@/lib/db";
import PackageBuyInfo from "@/lib/db/models/PackageBuyInfo.model";
import {
  generateRandomString,
  getIstTime,
} from "@/lib/helper";
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

// import { connectToDatabase } from "@/lib/db";
// import { PackageBuyInfo } from "@/models/packageBuyInfo";
// import { createROIHistory } from "@/utils/roiHelpers";
// import { PackageRoi } from "@/lib/db/models/PackageROI.model";

const COMMISSION_PERCENTAGE = 2;

export async function POST() {
  try {
    await connectToDatabase();

    // Fetch active packages
    const activePackages = await PackageBuyInfo.find({
      isActive: true,
      isROIFree: false,
      status: "success",
    }).lean();

    console.log(`Total active packages: ${activePackages.length}`);

    if (activePackages.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No eligible packages for ROI distribution.",
        processedCount: 0,
        timestamp: new Date().toISOString(),
      });
    }

    // Process packages with error handling for each
    const results = await Promise.allSettled(
      activePackages.map(async (pkg) => {
        const commissionAmount =
          (pkg.packageAmount * COMMISSION_PERCENTAGE) / 100;

        console.log(
          `Processing package ${pkg.packageId}: ${pkg.userId}, Commission: ${commissionAmount}`
        );

        // Update package and get updated data
        const updatedPackage = await PackageBuyInfo.findOneAndUpdate(
          {
            packageId: pkg.packageId,
            isActive: true, // Double check it's still active
          },
          {
            $inc: {
              incomeDay: 1,
              totalReturnedAmount: commissionAmount,
            },
            $set: {
              isFirstROI: false,
            },
          },
          { new: true } // Return updated document
        );

        if (!updatedPackage) {
          throw new Error(`Package ${pkg.packageId} not found or not active`);
        }

        // Create ROI history
        await createROIHistory({
          userId: pkg.userId,
          fullName: pkg.fullName,
          packageAmount: pkg.packageAmount,
          commissionPercentage: COMMISSION_PERCENTAGE,
          commissionAmount,
          incomeDay: updatedPackage.incomeDay,
        });

        return {
          packageId: pkg.packageId,
          userId: pkg.userId,
          commissionAmount,
        };
      })
    );

    // Separate successful and failed results
    const successful = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter((r) => r.status === "rejected");

    // Log failures

    return NextResponse.json({
      success: true,
      processedCount: successful.length,
      failedCount: failed.length,
      totalPackages: activePackages.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("ROI distribution error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

const createROIHistory = async (
  userId,
  fullName,
  packageAmount,
  commissionPercentage,
  commissionAmount,
  incomeDay
) => {
  console.log("Create ROI");
  console.log({
    userId,
    fullName,
    packageAmount,
    commissionPercentage,
    commissionAmount,
    incomeDay,
  });

  const istTime = getIstTime();

  await PackageRoi.create({
    userId,
    fullName,
    package: packageAmount,
    commissionPercentage,
    commissionAmount: Number(commissionAmount).toFixed(3),
    incomeDay,
    incomeDate: new Date(istTime.date).toDateString(),
    incomeTime: istTime.time,
    incomeDateInt: new Date(istTime.date).getTime(),
    transactionId: generateRandomString(),
  });
};
