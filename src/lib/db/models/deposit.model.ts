import mongoose, { Schema, Document, model, models } from "mongoose";
import { Model } from "mongoose";

export interface IDeposit extends Document {
  userId: string;
  fullName: string;
  amount: number;
  point: number;
  status: "pending" | "succeed" | "rejected";
  date?: string;
  time?: string;
  depositId: string;
  transactionId?: string;
  transactionHash?: string;
  tid?: string;
  depositType: string;
  proofPic?: {
    imageUrl?: string;
    publicUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const depositSchema = new Schema<IDeposit>(
  {
    userId: { type: String, required: [true, "User ID is required"] },
    fullName: { type: String, required: [true, "Full Name is required"] },
    amount: { type: Number, required: [true, "Amount is required"] },
    // point: { type: Number, required: [true, "Point is required"] },
    status: {
      type: String,
      enum: ["pending", "succeed", "rejected"],
      default: "pending",
    },
    date: { type: String },
    time: { type: String },
    depositId: { type: String, required: [true, "Deposit Id is required"] },
    transactionId: { type: String },
    transactionHash: { type: String },
    tid: String,
    depositType: { type: String, required: [true, "Deposit type is required"] },
    proofPic: {
      imageUrl: String,
      publicUrl: String,
    },
  },
  { timestamps: true }
);

const Deposit: Model<IDeposit> =
  mongoose?.models?.Deposit ||
  mongoose.model<IDeposit>("Deposit", depositSchema);
export default Deposit;
