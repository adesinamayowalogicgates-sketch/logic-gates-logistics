import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { walletPaySchema } from "@/lib/validation";
import { getBookingAmount } from "@/lib/booking";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const { bookingId } = walletPaySchema.parse(payload);

    const result = await prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findFirst({
        where: { id: bookingId, userId: session.user.id }
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

      if (booking.paymentStatus === "PAID") {
        throw new Error("Booking already paid");
      }

      const amount = getBookingAmount({
        overrideAmount: booking.overrideAmount,
        paymentAmount: booking.paymentAmount,
        priceBreakdown: booking.priceBreakdown
      });

      if (!amount || amount < 1) {
        throw new Error("Invalid booking amount");
      }

      const user = await tx.user.findUnique({
        where: { id: session.user.id },
        select: { walletBalance: true }
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.walletBalance < amount) {
        throw new Error("Insufficient wallet balance");
      }

      await tx.user.update({
        where: { id: session.user.id },
        data: { walletBalance: { decrement: amount } }
      });

      await tx.walletTransaction.create({
        data: {
          userId: session.user.id,
          bookingId: booking.id,
          type: "DEBIT",
          amount,
          source: "BOOKING",
          reference: booking.id,
          note: "Wallet payment for booking"
        }
      });

      await tx.booking.update({
        where: { id: booking.id },
        data: {
          status: "PAID",
          paymentStatus: "PAID",
          paymentMethod: "WALLET",
          paymentAmount: amount
        }
      });

      return { amount, balance: user.walletBalance - amount };
    });

    return NextResponse.json({ status: "ok", ...result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Unable to pay" }, { status: 400 });
  }
}
