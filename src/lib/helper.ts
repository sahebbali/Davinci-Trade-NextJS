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

const createROIHistory = async (
  userId,
  fullName,
  packageAmount,
  commissionPercentage,
  commissionAmount,
  incomeDay
) => {
  console.log("crate ROI");
  console.log({
    userId,
    fullName,
    packageAmount,
    commissionPercentage,
    commissionAmount,
    incomeDay,
  });
  await PackageRoi.create({
    userId,
    fullName,
    package: packageAmount,
    commissionPercentage: commissionPercentage,
    commissionAmount: Number(commissionAmount).toFixed(3),
    // totalCommissionAmount: Number(
    //   ext?.totalReturnedAmount + roiPerDayCommissionAmount
    // ).toFixed(3),
    incomeDay,
    incomeDate: new Date(getIstTime().date).toDateString(),
    incomeTime: getIstTime().time,
    incomeDateInt: new Date(getIstTime().date).getTime(),
    transactionId: generateRandomNumericString(10),
  });
};