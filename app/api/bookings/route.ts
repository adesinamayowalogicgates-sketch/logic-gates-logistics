import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { bookingPayloadSchema } from "@/lib/validation";
import { calculatePrice } from "@/lib/pricing";
import type { ServiceType } from "@/lib/constants";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(bookings);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const data = bookingPayloadSchema.parse(payload);

    const breakdown = calculatePrice({
      serviceType: data.serviceType as ServiceType,
      vehicleType: data.vehicleType,
      securityQty: data.securityQty
    });

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        serviceType: data.serviceType,
        pickupLocation: data.pickupLocation,
        dropoffLocation: data.dropoffLocation,
        pickupTime: new Date(data.pickupTime),
        passengers: data.passengers,
        vehicleType: data.vehicleType,
        notes: data.notes,
        securityRequired: data.securityRequired,
        securityQty: data.securityQty,
        status: "PENDING_PAYMENT",
        paymentStatus: "UNPAID",
        priceBreakdown: JSON.stringify(breakdown),
        paymentAmount: breakdown.total
      }
    });

    return NextResponse.json({
      id: booking.id,
      priceBreakdown: breakdown
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message ?? "Invalid request" }, { status: 400 });
  }
}
