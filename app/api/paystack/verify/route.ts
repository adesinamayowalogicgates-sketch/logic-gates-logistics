import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Reference required" }, { status: 400 });
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: "Paystack not configured" }, { status: 500 });
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    }
  );

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: data?.message ?? "Paystack error" }, { status: 500 });
  }

  if (data.data?.status === "success") {
    const booking = await prisma.booking.findFirst({
      where: { paymentReference: reference }
    });

    if (booking) {
      const amount = Math.round((data.data?.amount ?? 0) / 100);
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: "PAID",
          paymentStatus: "PAID",
          paymentMethod: booking.paymentMethod ?? "PAYSTACK",
          paymentAmount: amount || booking.paymentAmount
        }
      });
    }
  }

  return NextResponse.json({ status: data.data?.status, data: data.data });
}
