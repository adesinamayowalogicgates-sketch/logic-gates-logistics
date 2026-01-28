import Link from "next/link";
import { prisma } from "@/lib/prisma";
import StatusBadge from "@/components/admin/StatusBadge";
import { getBookingAmount } from "@/lib/booking";

const statusOptions = [
  "all",
  "DRAFT",
  "PENDING_PAYMENT",
  "PAID",
  "ASSIGNED",
  "COMPLETED",
  "CANCELLED"
];

const paymentOptions = ["all", "UNPAID", "PENDING", "PAID", "FAILED"];

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: { status?: string; paymentStatus?: string; search?: string };
}) {
  const status = searchParams.status || "all";
  const paymentStatus = searchParams.paymentStatus || "all";
  const search = searchParams.search || "";

  const bookings = await prisma.booking.findMany({
    where: {
      ...(status !== "all" ? { status } : {}),
      ...(paymentStatus !== "all" ? { paymentStatus } : {}),
      ...(search
        ? {
            user: {
              OR: [
                { email: { contains: search } },
                { phone: { contains: search } }
              ]
            }
          }
        : {})
    },
    include: {
      user: { select: { name: true, email: true, phone: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-body text-muted">Admin</p>
          <h1 className="text-h1 font-semibold text-text-primary">Bookings</h1>
        </div>
      </div>

      <form className="card-base grid gap-4 p-4 md:grid-cols-4">
        <label className="text-body text-muted">
          Status
          <select
            name="status"
            defaultValue={status}
            className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="text-body text-muted">
          Payment status
          <select
            name="paymentStatus"
            defaultValue={paymentStatus}
            className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          >
            {paymentOptions.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="text-body text-muted md:col-span-2">
          Customer email or phone
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by email or phone"
            className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          />
        </label>
        <div className="md:col-span-4">
          <button type="submit" className="btn-primary w-full md:w-auto">
            Apply filters
          </button>
        </div>
      </form>

      <div className="card-base overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-body text-text-primary">
          <thead className="border-b border-border-muted/20 bg-off-white/60 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Booking</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Pickup</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border-muted/20">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/bookings/${booking.id}`}
                      className="font-semibold text-text-primary underline"
                    >
                      {booking.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    <div className="font-semibold text-text-primary">
                      {booking.user?.name}
                    </div>
                    <div>{booking.user?.email}</div>
                    <div>{booking.user?.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    <div className="font-semibold text-text-primary">
                      {booking.serviceType}
                    </div>
                    <div>{booking.vehicleType}</div>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(booking.pickupTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={booking.paymentStatus} />
                  </td>
                  <td className="px-4 py-3 font-semibold text-text-primary">
                    NGN{" "}
                    {getBookingAmount({
                      overrideAmount: booking.overrideAmount,
                      paymentAmount: booking.paymentAmount,
                      priceBreakdown: booking.priceBreakdown
                    }).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-muted">
                  No bookings match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
