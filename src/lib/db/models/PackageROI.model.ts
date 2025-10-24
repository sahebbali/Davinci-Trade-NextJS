import mongoose, { Schema, model, models, Document } from "mongoose";


// TypeScript Interface
export interface IPackageRoi extends Document {
  userId: string;
  fullName: string;
  package: number;
  commissionPercentage: number;
  commissionAmount: number;
  incomeDay: number;
  incomeDate: string;
  incomeTime: string;
  incomeDateInt: number;
  transactionId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema
const packageRoiSchema = new Schema<IPackageRoi>(
  {
    userId: { type: String, required: true },
    fullName: { type: String, required: true },
    package: { type: Number, required: true },
    commissionPercentage: { type: Number, required: true },
    commissionAmount: { type: Number, required: true },
    incomeDay: { type: Number, required: true },
    incomeDate: { type: String, required: true },
    incomeTime: { type: String, required: true },
    incomeDateInt: { type: Number, required: true },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);



// Model
export const PackageRoi =
  models.PackageRoi || model<IPackageRoi>("PackageRoi", packageRoiSchema);