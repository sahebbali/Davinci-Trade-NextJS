import { PackageRoi } from "./db/models/PackageROI.model";
import Wallet, { IWallet } from "./db/models/wallet.model";

function generateRandomNumericString(length: number) {
  const characters = "0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function generateUniqueUserID() {
  const userIDLength = 6;
  const randomNumericString = generateRandomNumericString(userIDLength);
  const userID = `DT-${randomNumericString}`;
  return userID;
}
export function generateUniqueTOPUPID() {
  const userIDLength = 12;
  const randomNumericString = generateRandomNumericString(userIDLength);
  const userID = `DT-TOP-${randomNumericString}`;
  return userID;
}

export const updateMultipleWalletBalances = async (
  userId: string,
  updates: Partial<Record<keyof IWallet, number>>
): Promise<IWallet | null> => {
  // Define allowed numeric fields
  const numericFields: (keyof IWallet)[] = [
    "selfInvestment",
    "roiIncome",
    "levelROI",
    "directReferral",
    "welcomeBonus",
    "walletHoldingBonus",
    "BidingTeamBonus",
    "depositBalance",
    "totalIncome",
    "winingAmount",
    "winingFromLevel",
    "withdrawalBallance",
    "rewardIncome",
    "gameWallet",
  ];

  // Filter out invalid fields
  const validUpdates: Record<string, number> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (
      numericFields.includes(key as keyof IWallet) &&
      typeof value === "number"
    ) {
      validUpdates[key] = value;
    }
  }

  if (Object.keys(validUpdates).length === 0) {
    throw new Error("No valid numeric wallet fields provided for update.");
  }

  // Perform update
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $inc: validUpdates },
    { new: true, upsert: true }
  );

  return wallet;
};
// Helper function to get IST time
const getIstTime = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istTime = new Date(now.getTime() + istOffset);
  
  return {
    date: istTime.toISOString().split('T')[0],
    time: istTime.toTimeString().split(' ')[0],
  };
};

// Helper function to generate random string
const generateRandomString = (length: number = 16): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

interface CreateROIHistoryParams {
  userId: string;
  fullName: string;
  packageAmount: number;
  commissionPercentage: number;
  commissionAmount: number;
  incomeDay: number;
}

export const createROIHistory = async ({
  userId,
  fullName,
  packageAmount,
  commissionPercentage,
  commissionAmount,
  incomeDay,
}: CreateROIHistoryParams): Promise<void> => {
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