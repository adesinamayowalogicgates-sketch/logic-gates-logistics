import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        if (!user.emailVerifiedAt) {
          throw new Error("Please verify your email to continue.");
        }

        const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
        if (adminEmail && user.email.toLowerCase() === adminEmail && user.role !== "admin") {
          await prisma.user.update({
            where: { id: user.id },
            data: { role: "admin" }
          });
          user.role = "admin";
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          company: user.company ?? null,
          role: user.role
        } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.phone = (user as any).phone;
        token.company = (user as any).company;
        token.role = (user as any).role;
      }
      if (token?.id && (!token.role || !token.email)) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { email: true, phone: true, company: true, role: true }
        });
        if (dbUser) {
          token.email = dbUser.email;
          token.phone = dbUser.phone ?? null;
          token.company = dbUser.company ?? null;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string | undefined;
        session.user.phone = token.phone as string | undefined;
        session.user.company = token.company as string | undefined;
        session.user.role = token.role as string | undefined;
      }
      return session;
    }
  },
  pages: {
    signIn: "/app/login"
  }
};
