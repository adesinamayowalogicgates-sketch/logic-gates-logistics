import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getBookingAmount, parsePriceBreakdown } from "@/lib/booking";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  BookingAssignForm,
  BookingOverrideForm,
  BookingStatusForm
} from "@/components/admin/BookingActions";

interface Params {
  params: { id: string };
}

export default async function AdminBookingDetailPage({ params }: Params) {
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: { user: true }
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
        <Link href="/admin/bookings" className="btn-outline">
          Back to bookings
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Customer</h2>
            <div className="mt-4 space-y-2 text-body text-muted">
              <p className="text-body font-semibold text-text-primary">{booking.user.name}</p>
              <p>{booking.user.email}</p>
              <p>{booking.user.phone}</p>
            </div>
          </div>

          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Trip details</h2>
            <div className="mt-4 grid gap-4 text-body text-muted">
              <div>
                <p className="text-body font-semibold text-text-primary">Route</p>
                <p>
                  {booking.pickupLocation} → {booking.dropoffLocation}
                </p>
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
                <p>
                  {booking.securityRequired
                    ? `Yes (${booking.securityQty})`
                    : "No"}
                </p>
              </div>
              {booking.notes ? (
                <div>
                  <p className="text-body font-semibold text-text-primary">Notes</p>
                  <p>{booking.notes}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Payment</h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={booking.status} />
              <StatusBadge status={booking.paymentStatus} />
              {booking.paymentMethod ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-800">
                  {booking.paymentMethod}
                </span>
              ) : null}
            </div>
            <div className="mt-4 space-y-2 text-body text-muted">
              <div className="flex items-center justify-between">
                <span>Base price</span>
                <span>NGN {breakdown?.basePrice?.toLocaleString() ?? "-"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security fee</span>
                <span>NGN {breakdown?.securityFee?.toLocaleString() ?? "-"}</span>
              </div>
              <div className="flex items-center justify-between font-semibold text-text-primary">
                <span>Total</span>
                <span>NGN {amount.toLocaleString()}</span>
              </div>
              {booking.overrideAmount ? (
                <p className="text-body text-muted">
                  Override applied: NGN {booking.overrideAmount.toLocaleString()}
                </p>
              ) : null}
              {booking.paymentReference ? (
                <p className="text-body text-muted">
                  Payment ref: {booking.paymentReference}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Update status</h2>
            <div className="mt-4">
              <BookingStatusForm bookingId={booking.id} status={booking.status} />
            </div>
          </div>

          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Assign resources</h2>
            <div className="mt-4">
              <BookingAssignForm
                bookingId={booking.id}
                driverName={booking.driverName}
                driverPhone={booking.driverPhone}
                vehicleLabel={booking.vehicleLabel}
                securityAssigned={booking.securityAssigned}
                securityNotes={booking.securityNotes}
              />
            </div>
          </div>

          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Override pricing</h2>
            <div className="mt-4">
              <BookingOverrideForm
                bookingId={booking.id}
                overrideAmount={booking.overrideAmount}
                overrideReason={booking.overrideReason}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
