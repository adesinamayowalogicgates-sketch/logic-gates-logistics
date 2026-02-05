import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getBookingAmount, parsePriceBreakdown } from "@/lib/booking";

interface Params {
  params: { id: string };
}

export default async function BookingDetailPage({ params }: Params) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";

  const booking = await prisma.booking.findFirst({
    where: { id: params.id, userId }
  });

  if (!booking) {
    return notFound();
  }

  const breakdown = parsePriceBreakdown(booking.priceBreakdown);
  const amount = getBookingAmount({
    overrideAmount: booking.overrideAmount,
    paymentAmount: booking.paymentAmount,
    priceBreakdown: booking.priceBreakdown
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-body text-muted">Booking</p>
          <h1 className="text-h1 font-semibold text-text-primary">
            {booking.serviceType} · {booking.vehicleType}
          </h1>
        </div>
        <Link href="/app/bookings" className="app-btn-secondary">
          Back to bookings
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="app-card p-6 lg:col-span-2">
          <h2 className="text-h1 font-semibold text-text-primary">Trip summary</h2>
          <div className="mt-4 grid gap-4 text-body text-muted">
            <div>
              <p className="text-body font-semibold text-text-primary">Route</p>
              <p>{booking.pickupLocation} → {booking.dropoffLocation}</p>
            </div>
            <div>
              <p className="text-body font-semibold text-text-primary">Pickup time</p>
              <p>{new Date(booking.pickupTime).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-body font-semibold text-text-primary">Passengers</p>
              <p>{booking.passengers}</p>
            </div>
            <div>
              <p className="text-body font-semibold text-text-primary">Security</p>
              <p>{booking.securityRequired ? `Yes (${booking.securityQty})` : "No"}</p>
            </div>
            {booking.notes ? (
              <div>
                <p className="text-body font-semibold text-text-primary">Notes</p>
                <p>{booking.notes}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="app-card p-6">
          <h2 className="text-h1 font-semibold text-text-primary">Payment</h2>
          <p className="mt-3 text-body text-muted">
            Status: {booking.paymentStatus.toLowerCase()}
          </p>
          <div className="mt-4 space-y-2 text-body text-muted">
            <div className="flex items-center justify-between">
              <span>Base price</span>
              <span>NGN {breakdown?.basePrice?.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Security fee</span>
              <span>NGN {breakdown?.securityFee?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-text-primary">
              <span>Total</span>
              <span>NGN {amount.toLocaleString()}</span>
            </div>
          </div>
          {booking.overrideAmount ? (
            <p className="mt-3 text-body text-muted">
              Admin adjusted total applied.
            </p>
          ) : null}
          {booking.paymentStatus !== "PAID" ? (
            <Link
              href={`/app/checkout/${booking.id}`}
              className="app-btn-primary mt-6 w-full"
            >
              Pay now
            </Link>
          ) : (
            <Link
              href={`/app/checkout/success?reference=${booking.paymentReference}`}
              className="app-btn-secondary mt-6 w-full"
            >
              View receipt
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
