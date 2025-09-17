import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./lib/db";
import client from "./lib/db/client";

import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import User from "./lib/db/models/user.model";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      credentials: {
        identifier: { label: "Email or User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        if (!credentials?.identifier || !credentials?.password) return null;

        // Find user by email OR userId
        const user = await User.findOne({
          $or: [
            { email: credentials.identifier },
            { userId: credentials.identifier },
          ],
        });

        if (!user || !user.password) return null;

        const isMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isMatch) return null;

        return {
          userId: user.userId.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        if (!user.name) {
          await connectToDatabase();
          await User.findByIdAndUpdate(user.id, {
            name: user.name || user.email!.split("@")[0],
            role: "user",
          });
        }
        token.name = user.name || user.email!.split("@")[0];
        token.role = (user as { role: string }).role;
      }

      if (session?.user?.name && trigger === "update") {
        token.name = session.user.name;
      }
      return token;
    },
    session: async ({ session, user, trigger, token }) => {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      session.user.name = token.name;
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
  },
});
