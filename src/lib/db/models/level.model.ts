// models/Level.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface ILevelDetails {
  userId: string;
  fullName: string;
  mobile: string;
  level: number;
  sponsorId: string;
  sponsorName: string;
  joiningDate: string;
  activationDate: string;
  isActive: boolean;
}

export interface ILevel extends Document {
  userId: string;
  fullName: string;
  mobile: string;
  sponsorId: string;
  sponsorName: string;
  level: ILevelDetails;
}

const levelDetailsSchema = new Schema<ILevelDetails>(
  {
    userId: { type: String },
    fullName: { type: String },
    mobile: { type: String },
    level: { type: Number },
    sponsorId: { type: String },
    sponsorName: { type: String },
    joiningDate: { type: String },
    activationDate: { type: String, default: "N/A" },
    isActive: { type: Boolean, default: false },
  },
  { _id: false }
);

const levelSchema = new Schema<ILevel>(
  {
    userId: { type: String },
    fullName: { type: String },
    mobile: { type: String },
    sponsorId: { type: String },
    sponsorName: { type: String },
    level: { type: levelDetailsSchema },
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js
const Level: Model<ILevel> =
  mongoose.models.Level || mongoose.model<ILevel>("Level", levelSchema);

export default Level;
