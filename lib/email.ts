import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendOtpEmail(params: { to: string; otp: string }) {
  if (!resend) {
    throw new Error("Resend not configured");
  }

  const from = process.env.FROM_EMAIL || "no-reply@logicgateslogistics.com";

  await resend.emails.send({
    from,
    to: params.to,
    subject: "Your Logic Gates verification code",
    html: `<p>Your verification code is <strong>${params.otp}</strong>. It expires in 10 minutes.</p>`
  });
}
