/* eslint-disable @typescript-eslint/no-explicit-any */
import Credentials from "next-auth/providers/credentials";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials): Promise<any> {
        if(!credentials?.email || !credentials?.password) {
          return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if(!user) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if(!isPasswordValid) {
          return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        return NextResponse.json({ email: user.email, name: user.username }, { status: 200 });
      }
    })
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };