import mongoose, { Document, Model, model, models, Schema } from "mongoose";

/**
 * Package purchase / subscription info interface
 */
export interface IPackageBuyInfo extends Document {
  userId: string;
  fullName?: string;
  sponsorId?: string;
  sponsorName?: string;
  packageId: string;
  packageAmount: number;
  packageLimit: number;
  isActive: boolean;
  isComplete: boolean;
  isExpired: boolean;
  isFirstROI: boolean;
  isROIFree: boolean;
  isAdmin?: boolean;
  isMondayCheck?: boolean;
  incomeDay: number;
  totalReturnedAmount: number;
  startDate?: string;
  startDateInt?: number;
  endDate?: string;
  endDateInt?: number;
  packageType?: string;
  date?: string;
  time?: string;
  upgradedAmount?: number;
  status: "pending" | "success" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Schema
 */
const PackageBuyInfoSchema = new Schema<IPackageBuyInfo>(
  {
    userId: {
      type: String,
      required: true,
    },
    fullName: { type: String, trim: true },

    sponsorId: {
      type: String,
      required: true,
    },
    sponsorName: { type: String, trim: true },

    packageId: { type: String, required: true, index: true },
    packageAmount: { type: Number, required: true, min: 0 },
    packageLimit: { type: Number, required: true, min: 0 },

    // flags
    isActive: { type: Boolean, default: false, index: true },
    isComplete: { type: Boolean, default: false },
    isExpired: { type: Boolean, default: false },
    isFirstROI: { type: Boolean, default: true },
    isROIFree: { type: Boolean, default: false },

    isAdmin: { type: Boolean, default: false },
    isMondayCheck: { type: Boolean, default: false },

    // counters
    incomeDay: { type: Number, default: 0, required: true, min: 0 },
    totalReturnedAmount: { type: Number, default: 0, required: true, min: 0 },

    // dates (string + integer timestamp if you want both)
    startDate: { type: String },
    startDateInt: { type: Number },
    endDate: { type: String },
    endDateInt: { type: Number },

    packageType: { type: String },
    date: { type: String },
    time: { type: String },

    upgradedAmount: { type: Number, default: 0, min: 0 },

    status: {
      type: String,
      enum: ["pending", "success", "rejected"],
      default: "pending",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        // Convert _id to id and delete _id, remove any Buffer fields etc
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        ret.id = String(ret._id);
        delete ret._id;
        return ret;
      },
    },
  }
);

/**
 * Indexes that help common queries
 */
PackageBuyInfoSchema.index({ userId: 1 });
PackageBuyInfoSchema.index({ packageId: 1, status: 1 });

/**
 * Virtual: remainingLimit (example)
 */
PackageBuyInfoSchema.virtual("remainingLimit").get(function (
  this: IPackageBuyInfo
) {
  // defensive: ensure numeric
  const limit = Number(this.packageLimit || 0);
  const returned = Number(this.totalReturnedAmount || 0);
  return Math.max(0, limit - returned);
});

/**
 * Static helper methods (optional)
 */
PackageBuyInfoSchema.statics.markActive = async function (
  id: string | mongoose.Types.ObjectId
) {
  return this.findByIdAndUpdate(
    id,
    { isActive: true, isExpired: false },
    { new: true }
  ).lean();
};

PackageBuyInfoSchema.statics.markExpired = async function (
  id: string | mongoose.Types.ObjectId
) {
  return this.findByIdAndUpdate(
    id,
    { isExpired: true, isActive: false },
    { new: true }
  ).lean();
};

/**
 * Prevent model overwrite upon HMR in Next.js
 */
const PackageBuyInfo: Model<IPackageBuyInfo> =
  (models.PackageBuyInfo as Model<IPackageBuyInfo>) ||
  model<IPackageBuyInfo>("PackageBuyInfo", PackageBuyInfoSchema);

export default PackageBuyInfo;
