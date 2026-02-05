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
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((tab) => (
          <Link
            key={tab.value}
            href={`/app/bookings?filter=${tab.value}`}
            className={`app-tab ${filter === tab.value ? "app-tab-active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length ? (
          filtered.map((booking) => (
            <div key={booking.id} className="app-card app-card-hover p-6">
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
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-border-muted/40 bg-off-white/80 p-6 text-body text-muted">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 7V3m8 4V3M4 11h16M5 21h14a1 1 0 001-1v-9a1 1 0 00-1-1H5a1 1 0 00-1 1v9a1 1 0 001 1z" />
              </svg>
              <span>No bookings to show yet.</span>
            </div>
            <Link href="/app/bookings/new" className="app-btn-primary">
              Create new booking
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
