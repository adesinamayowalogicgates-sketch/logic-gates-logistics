import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashOtp } from "@/lib/otp";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const email = String(payload?.email || "").toLowerCase();
    const otp = String(payload?.otp || "");

    if (!email || otp.length !== 6) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const record = await prisma.emailOtp.findUnique({ where: { email } });
    if (!record) {
      return NextResponse.json({ error: "OTP not found" }, { status: 404 });
    }

    if (record.attempts >= 5) {
      return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
    }

    if (record.expiresAt < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    const otpHash = hashOtp(otp, email);
    if (otpHash !== record.otpHash) {
      await prisma.emailOtp.update({
        where: { email },
        data: { attempts: { increment: 1 } }
      });
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerifiedAt: new Date() }
    });

    await prisma.emailOtp.delete({ where: { email } });

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}
