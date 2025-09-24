// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define a TypeScript interface for User
export interface IUser extends Document {
  userId: string;
  fullName?: string;
  email: string;
  password: string;
  mobile?: string;
  sponsorId: string;
  sponsorName: string;
  token?: string;
  role: "user" | "admin";
  isActive: boolean;
  activationDate: string;
  joiningDate?: string;
  rank: string;
  userStatus?: boolean;
  totalDownline?: number;
  team: { userId: string; level: string }[];
  country?: string;
  address?: string;
  gender?: string;
  avatar?: string;
  deleteStatus: boolean;
  walletAddress?: string;

  matchPassword(enteredPassword: string): Promise<boolean>;
}

// Create the schema
const userSchema: Schema<IUser> = new Schema(
  {
    userId: { type: String, required: [true, "User id is required"] },
    fullName: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Must be at least 6 characters"],
    },
    mobile: { type: String },
    sponsorId: { type: String, required: [true, "Sponsor ID is required"] },
    sponsorName: { type: String, required: [true, "Sponsor Name is required"] },
    token: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isActive: { type: Boolean, default: false },
    activationDate: { type: String, default: "N/A" },
    joiningDate: { type: String },
    rank: { type: String, default: "N/A" },
    userStatus: { type: Boolean },
    totalDownline: { type: Number },
    team: [{ userId: String, level: String }],
    country: { type: String },
    address: { type: String },
    gender: { type: String },
    avatar: { type: String },
    deleteStatus: { type: Boolean, default: false },
    walletAddress: { type: String },
  },
  { timestamps: true }
);

// Methods
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Avoid OverwriteModelError in Next.js
const User: Model<IUser> =
  mongoose?.models?.User || mongoose.model<IUser>("User", userSchema);

export default User;
