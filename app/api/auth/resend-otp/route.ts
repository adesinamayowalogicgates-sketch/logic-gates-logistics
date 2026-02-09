import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const email = String(payload?.email || "").toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const record = await prisma.emailOtp.findUnique({ where: { email } });
    if (record && Date.now() - record.createdAt.getTime() < 60_000) {
      const retryAfter = Math.max(1, Math.ceil((60_000 - (Date.now() - record.createdAt.getTime())) / 1000));
      return NextResponse.json(
        { error: "Please wait before requesting a new code.", retryAfter },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp, email);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.emailOtp.upsert({
      where: { email },
      update: { otpHash, expiresAt, attempts: 0, createdAt: new Date() },
      create: { email, otpHash, expiresAt }
    });

    await sendOtpEmail({ to: email, otp });

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}
