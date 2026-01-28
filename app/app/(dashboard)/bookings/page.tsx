import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const filters = [
  { label: "All", value: "all" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" }
];

export default async function BookingsPage({
  searchParams
}: {
  searchParams: { filter?: string };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";
  const filter = searchParams.filter || "all";

  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  const filtered = bookings.filter((booking) => {
    if (filter === "upcoming") {
      return ["PAID", "ASSIGNED"].includes(booking.status);
    }
    if (filter === "past") {
      return ["COMPLETED", "CANCELLED"].includes(booking.status);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 font-semibold text-text-primary">Your bookings</h1>
          <p className="text-body text-muted">
            Track scheduled trips, payment status, and assigned drivers.
          </p>
        </div>
        <Link href="/app/bookings/new" className="btn-primary">
          New booking
        </Link>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((tab) => (
          <Link
            key={tab.value}
            href={`/app/bookings?filter=${tab.value}`}
            className={`rounded-full px-4 py-2 text-body font-semibold transition focus-ring ${
              filter === tab.value
                ? "bg-navy text-white"
                : "bg-white text-text-primary"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length ? (
          filtered.map((booking) => (
            <div key={booking.id} className="card-base p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-body font-semibold text-text-primary">
                    {booking.serviceType} · {booking.vehicleType}
                  </p>
                  <p className="text-body text-muted">
                    {booking.pickupLocation} → {booking.dropoffLocation}
                  </p>
                </div>
                <span className="rounded-full bg-off-white px-3 py-1 text-body text-muted">
                  {booking.status.replace("_", " ")}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-body text-muted">
                  {booking.paymentStatus.toLowerCase()} · {new Date(booking.pickupTime).toLocaleString()}
                </p>
                <Link
                  href={`/app/bookings/${booking.id}`}
                  className="text-body text-text-primary underline"
                >
                  View details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-body text-muted">No bookings to show yet.</p>
        )}
      </div>
    </div>
  );
}
