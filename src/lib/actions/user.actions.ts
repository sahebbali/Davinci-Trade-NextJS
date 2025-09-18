"use server";

import bcrypt from "bcryptjs";
import { IUserSignIn, IUserSignUp } from "@/types";
import { UserSignUpSchema, UserUpdateSchema } from "../validator";
import { connectToDatabase } from "../db";

import { formatError } from "../utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
// import { auth, signIn, signOut } from "@/auth";
import User, { IUser } from "../db/models/user.model";
import { generateUniqueUserID } from "../helper";
import { signIn } from "next-auth/react";

// import { getSetting } from './setting.actions'

// CREATE
export async function registerUser(userSignUp: IUserSignUp) {
  try {
    // ✅ Validate
    const user = await UserSignUpSchema.parseAsync(userSignUp);

    // ✅ Connect DB
    await connectToDatabase();

    // ✅ Create User
    await User.create({
      userId: generateUniqueUserID(), // or your own generator
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: user.password,
      mobile: user.phoneNumber,
      sponsorId: user.sponsorId,
      sponsorName: "N/A", // you can fetch sponsor details if needed
      country: user.countryCode,
    });

    return { success: true, message: "User created successfully" };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// DELETE

export async function deleteUser(id: string) {
  try {
    await connectToDatabase();
    const res = await User.findByIdAndDelete(id);
    if (!res) throw new Error("Use not found");
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
// UPDATE

export async function updateUser(user: z.infer<typeof UserUpdateSchema>) {
  try {
    await connectToDatabase();
    const dbUser = await User.findById(user._id);
    if (!dbUser) throw new Error("User not found");
    dbUser.fullName = user.name;
    dbUser.email = user.email;
    // dbUser.role = user.role;
    const updatedUser = await dbUser.save();
    revalidatePath("/admin/users");
    return {
      success: true,
      message: "User updated successfully",
      data: JSON.parse(JSON.stringify(updatedUser)),
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
// export async function updateUserName(user: IUserName) {
//   try {
//     await connectToDatabase();
//     const session = await auth();
//     const currentUser = await User.findById(session?.user?.id);
//     if (!currentUser) throw new Error("User not found");
//     currentUser.fullName = user.name;
//     const updatedUser = await currentUser.save();
//     return {
//       success: true,
//       message: "User updated successfully",
//       data: JSON.parse(JSON.stringify(updatedUser)),
//     };
//   } catch (error) {
//     return { success: false, message: formatError(error) };
//   }
// }

export async function signInWithCredentials(user: IUserSignIn) {
  try {
    const result = await signIn("credentials", { ...user, redirect: false });
    console.log("Sign-in result:", result);
    return result;
  } catch (error) {
    console.error("Error during signInWithCredentials:", error);
    // Re-throw or return a structured error if needed for the UI
    throw error; // Or return { success: false, error: formatError(error) };
  }
}
// export const SignInWithGoogle = async () => {
//   await signIn("google");
// };
// export const SignOut = async () => {
//   const redirectTo = await signOut({ redirect: false });
//   redirect(redirectTo.redirect);
// };

// GET
// export async function getAllUsers({
//   limit,
//   page,
// }: {
//   limit?: number
//   page: number
// }) {
//   // const {
//   //   common: { pageSize },
//   // } = await getSetting()
//   limit = limit || pageSize
//   await connectToDatabase()

//   const skipAmount = (Number(page) - 1) * limit
//   const users = await User.find()
//     .sort({ createdAt: 'desc' })
//     .skip(skipAmount)
//     .limit(limit)
//   const usersCount = await User.countDocuments()
//   return {
//     data: JSON.parse(JSON.stringify(users)) as IUser[],
//     totalPages: Math.ceil(usersCount / limit),
//   }
// }

export async function getUserById(userId: string) {
  await connectToDatabase();
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  return JSON.parse(JSON.stringify(user)) as IUser;
}
