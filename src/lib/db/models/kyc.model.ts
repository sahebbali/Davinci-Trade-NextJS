import mongoose, { Schema, Document, model, models, Model } from "mongoose";

export type KycStatus = "pending" | "approved" | "rejected";

export interface IKyc extends Document {
  userId: string;
  kyc_method?: string;
  card_number?: string;
  front_side?: string;
  back_side?: string;
  status: KycStatus;
  submission_date?: string;
  createdAt: Date;
  updatedAt: Date;
}

const kycSchema = new Schema<IKyc>(
  {
    userId: { type: String, required: true },
    kyc_method: { type: String },
    card_number: { type: String },
    front_side: { type: String },
    back_side: { type: String },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    submission_date: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite during hot reload
const Kyc: Model<IKyc> = models.Kyc || model<IKyc>("Kyc", kycSchema);

export default Kyc;
