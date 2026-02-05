import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const data = registerSchema.parse(payload);

    const existing = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await hash(data.password, 10);

    const rawPayload = payload as any;
    const baseData = {
      name: data.name || rawPayload.name || "Customer",
      email: data.email,
      phone: typeof rawPayload.phone === "string" ? rawPayload.phone : null,
      company: typeof rawPayload.company === "string" ? rawPayload.company : null,
      passwordHash
    };

    const extendedData = {
      ...baseData,
      firstName: typeof rawPayload.firstName === "string" ? rawPayload.firstName : null,
      lastName: typeof rawPayload.lastName === "string" ? rawPayload.lastName : null,
      gender: typeof rawPayload.gender === "string" ? rawPayload.gender : null,
      dateOfBirth: typeof rawPayload.dateOfBirth === "string" ? rawPayload.dateOfBirth : null,
      nationality: typeof rawPayload.nationality === "string" ? rawPayload.nationality : null,
      nextOfKinName: typeof rawPayload.nextOfKinName === "string" ? rawPayload.nextOfKinName : null,
      nextOfKinGender: typeof rawPayload.nextOfKinGender === "string" ? rawPayload.nextOfKinGender : null,
      nextOfKinPhone: typeof rawPayload.nextOfKinPhone === "string" ? rawPayload.nextOfKinPhone : null
    };

    let user;
    try {
      user = await prisma.user.create({ data: extendedData });
    } catch (dbError: any) {
      const message = dbError?.message || "";
      if (message.includes("column") || message.includes("does not exist") || message.includes("Unknown field")) {
        user = await prisma.user.create({ data: baseData });
      } else {
        throw dbError;
      }
    }

    return NextResponse.json({ id: user.id });
  } catch (error: any) {
    const message = Array.isArray(error?.issues) ? error.issues[0]?.message : error.message;
    return NextResponse.json({ error: message ?? "Invalid request" }, { status: 400 });
  }
}
