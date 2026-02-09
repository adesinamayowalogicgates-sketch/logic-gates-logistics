import { NextResponse, type NextRequest } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validation";
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

    const email = data.email.toLowerCase();
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
    const otpHash = hashOtp(otp, data.email.toLowerCase());
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.emailOtp.upsert({
      where: { email },
      update: { otpHash, expiresAt, attempts: 0, createdAt: new Date(), usedAt: null },
      create: {
        email,
        otpHash,
        expiresAt
      }
    });

    await sendOtpEmail({ to: data.email, otp });
    await prisma.emailOtpSend.create({ data: { email, ip } });

    return NextResponse.json({ id: user.id, requiresVerification: true });
  } catch (error: any) {
    const message = Array.isArray(error?.issues) ? error.issues[0]?.message : error.message;
    return NextResponse.json({ error: message ?? "Invalid request" }, { status: 400 });
  }
}
