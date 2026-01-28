import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBookingAmount } from "@/lib/booking";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { bookingId } = await request.json();
  if (!bookingId) {
    return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
  }

  const booking = await prisma.booking.findFirst({
    where: { id: bookingId, userId: session.user.id }
  });

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (booking.paymentStatus === "PAID") {
    return NextResponse.json({ error: "Booking already paid" }, { status: 400 });
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: "Paystack not configured" }, { status: 500 });
  }

  const amount = getBookingAmount({
    overrideAmount: booking.overrideAmount,
    paymentAmount: booking.paymentAmount,
    priceBreakdown: booking.priceBreakdown
  });
  if (!amount) {
    return NextResponse.json({ error: "Invalid booking amount" }, { status: 400 });
  }

  const reference = `LG-${booking.id}-${Date.now()}`;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: session.user.email,
      amount: amount * 100,
      reference,
      callback_url: `${appUrl}/app/checkout/success?reference=${reference}`,
      metadata: {
        bookingId: booking.id,
        userId: session.user.id
      }
    })
  });

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: data?.message ?? "Paystack error" }, { status: 500 });
  }

  await prisma.booking.update({
    where: { id: booking.id },
    data: {
      paymentReference: reference,
      paymentAmount: amount,
      paymentMethod: "PAYSTACK",
      status: "PENDING_PAYMENT",
      paymentStatus: "PENDING"
    }
  });

  return NextResponse.json({ authorizationUrl: data.data.authorization_url, reference });
}
