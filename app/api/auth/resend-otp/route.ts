import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/email";

const EMAIL_WINDOW_MS = 15 * 60 * 1000;
const IP_WINDOW_MS = 60 * 60 * 1000;
const EMAIL_LIMIT = 3;
const IP_LIMIT = 10;

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const email = String(payload?.email || "").toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const ip = getClientIp(request);
    const now = Date.now();
    const emailWindowStart = new Date(now - EMAIL_WINDOW_MS);
    const ipWindowStart = new Date(now - IP_WINDOW_MS);

    const [emailCount, ipCount] = await Promise.all([
      prisma.emailOtpSend.count({ where: { email, createdAt: { gte: emailWindowStart } } }),
      prisma.emailOtpSend.count({ where: { ip, createdAt: { gte: ipWindowStart } } })
    ]);

    if (emailCount >= EMAIL_LIMIT) {
      const oldest = await prisma.emailOtpSend.findFirst({
        where: { email, createdAt: { gte: emailWindowStart } },
        orderBy: { createdAt: "asc" },
        select: { createdAt: true }
      });
      const retryAfter = oldest
        ? Math.max(1, Math.ceil((EMAIL_WINDOW_MS - (now - oldest.createdAt.getTime())) / 1000))
        : Math.ceil(EMAIL_WINDOW_MS / 1000);
      return NextResponse.json(
        { error: "Too many codes sent to this email. Please wait before trying again.", retryAfter },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    if (ipCount >= IP_LIMIT) {
      const oldest = await prisma.emailOtpSend.findFirst({
        where: { ip, createdAt: { gte: ipWindowStart } },
        orderBy: { createdAt: "asc" },
        select: { createdAt: true }
      });
      const retryAfter = oldest
        ? Math.max(1, Math.ceil((IP_WINDOW_MS - (now - oldest.createdAt.getTime())) / 1000))
        : Math.ceil(IP_WINDOW_MS / 1000);
      return NextResponse.json(
        { error: "Too many codes sent from this IP. Please wait before trying again.", retryAfter },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const otp = generateOtp();
    const otpHash = hashOtp(otp, email);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.emailOtp.upsert({
      where: { email },
      update: { otpHash, expiresAt, attempts: 0, createdAt: new Date(), usedAt: null },
      create: { email, otpHash, expiresAt }
    });

    await sendOtpEmail({ to: email, otp });
    await prisma.emailOtpSend.create({ data: { email, ip } });

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}
