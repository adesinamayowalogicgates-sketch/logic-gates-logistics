import crypto from "crypto";

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function hashOtp(otp: string, email: string) {
  const salt = process.env.OTP_SALT || "logic-gates-otp";
  return crypto.createHash("sha256").update(`${otp}:${email}:${salt}`).digest("hex");
}

