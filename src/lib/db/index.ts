import mongoose from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn;
  // console.log({ MONGODB_URI });
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI);
  // console.log("DB Connection success");
  cached.conn = await cached.promise;

  return cached.conn;
};
