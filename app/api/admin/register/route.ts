import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = registerSchema.parse(payload);

    const email = data.email.toLowerCase();
    if (!email.endsWith("@logicgatesindustries.com")) {
      return NextResponse.json({ error: "Admin email domain required" }, { status: 403 });
    }

    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await hash(data.password, 10);

    const rawPayload = payload as any;
    const user = await prisma.user.create({
      data: {
        name: data.name || rawPayload.name || "Admin",
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        passwordHash,
        role: "admin"
      }
    });

    return NextResponse.json({ id: user.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}
