import mongoose, { Schema, Document, model, models, Model } from "mongoose";

export type WithdrawStatus = "pending" | "succeed" | "rejected";
export type WithdrawType = "bank" | "usdt" | "trx" | "upi";

export interface IWithdraw extends Document {
  userId: string;
  fullName?: string;
  sponsorId?: string;
  sponsorName?: string;
  requestPoint?: number;
  requestAmount?: number;
  withdrawCharge?: number;
  pointAfterCharge?: number;
  amountAfterCharge?: number;
  chargeInAmount?: number;
  chargeInPoint?: number;
  currentBalance?: number;
  withdrawType?: WithdrawType;
  paymentInfo?: {
    trxAddress?: string;
    upiAddress?: string;
    usdtAddress?: string;
    bankName?: string;
    holderName?: string;
    ifscCode?: string;
    branchName?: string;
    accountNumber?: string;
  };
  status?: WithdrawStatus;
  transactionId?: string;
  withdrawId?: string;
  date?: string;
  time?: string;
  createdAt: Date;
  updatedAt: Date;
}

const withdrawSchema = new Schema<IWithdraw>(
  {
    userId: { type: String, required: true },
    fullName: { type: String },
    sponsorId: { type: String },
    sponsorName: { type: String },
    requestPoint: { type: Number },
    requestAmount: { type: Number },
    withdrawCharge: { type: Number },
    pointAfterCharge: { type: Number },
    amountAfterCharge: { type: Number },
    chargeInAmount: { type: Number },
    chargeInPoint: { type: Number },
    currentBalance: { type: Number },
    withdrawType: { type: String, enum: ["bank", "usdt", "trx", "upi"] },
    paymentInfo: {
      trxAddress: { type: String },
      upiAddress: { type: String },
      usdtAddress: { type: String },
      bankName: { type: String },
      holderName: { type: String },
      ifscCode: { type: String },
      branchName: { type: String },
      accountNumber: { type: String },
    },
    status: {
      type: String,
      enum: ["pending", "succeed", "rejected"],
      default: "pending",
    },
    transactionId: { type: String },
    withdrawId: { type: String },
    date: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite during hot reload
const Withdraw: Model<IWithdraw> =
  models.Withdraw || model<IWithdraw>("Withdraw", withdrawSchema);

export default Withdraw;
