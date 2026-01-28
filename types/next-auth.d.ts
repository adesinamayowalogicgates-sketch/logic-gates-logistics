import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      company?: string | null;
      role?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    phone?: string | null;
    company?: string | null;
    role?: string | null;
  }
}
