import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Paystack not configured" }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature") || "";
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const reference = event.data?.reference;
    const amount = Math.round((event.data?.amount ?? 0) / 100);

    const booking = await prisma.booking.findFirst({
      where: { paymentReference: reference }
    });

    if (booking) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: "PAID",
          paymentStatus: "PAID",
          paymentMethod: booking.paymentMethod ?? "PAYSTACK",
          paymentAmount: amount
        }
      });
    }
  }

  return NextResponse.json({ received: true });
}
