import mongoose, { Schema, Document, model, models, Model } from "mongoose";

export interface IWallet extends Document {
  userId: string;
  fullName?: string;
  sponsorId?: string;
  sponsorName?: string;
  selfInvestment: number;
  roiIncome: number;
  levelROI: number;
  directReferral: number;
  welcomeBonus: number;
  walletHoldingBonus: number;
  BidingTeamBonus: number;
  depositBalance: number;
  totalIncome: number;
  winingAmount: number;
  winingFromLevel: number;
  withdrawalBallance: number;
  rewardIncome: number;
  gameWallet: number;
  createdAt: Date;
  updatedAt: Date;
}

const walletSchema = new Schema<IWallet>(
  {
    userId: { type: String, required: true },
    fullName: { type: String },
    sponsorId: { type: String },
    sponsorName: { type: String },
    selfInvestment: { type: Number, default: 0 },
    roiIncome: { type: Number, default: 0 },
    levelROI: { type: Number, default: 0 },
    directReferral: { type: Number, default: 0 },
    welcomeBonus: { type: Number, default: 0 },
    walletHoldingBonus: { type: Number, default: 0 },
    BidingTeamBonus: { type: Number, default: 0 },
    depositBalance: { type: Number, default: 0 },
    totalIncome: { type: Number, default: 0 },
    winingAmount: { type: Number, default: 0 },
    winingFromLevel: { type: Number, default: 0 },
    withdrawalBallance: { type: Number, default: 0 },
    rewardIncome: { type: Number, default: 0 },
    gameWallet: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent model overwrite during hot reload
const Wallet: Model<IWallet> =
  models.Wallet || model<IWallet>("Wallet", walletSchema);

export default Wallet;
