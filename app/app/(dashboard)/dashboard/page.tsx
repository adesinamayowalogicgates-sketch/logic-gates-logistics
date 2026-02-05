import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppHeader from "@/components/AppHeader";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";

  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: { pickupTime: "asc" },
    take: 6
  });

  const upcoming = bookings.filter((b) => ["PAID", "ASSIGNED"].includes(b.status));
  const past = bookings.filter((b) => ["COMPLETED", "CANCELLED"].includes(b.status));

  return (
    <div className="space-y-8">
      <AppHeader name={session?.user?.name} />

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Upcoming", value: upcoming.length },
          { label: "Past", value: past.length },
          { label: "Total", value: bookings.length }
        ].map((item) => (
          <div key={item.label} className="app-card app-card-hover p-6">
            <p className="text-body text-muted">{item.label}</p>
            <p className="mt-3 text-h1 font-semibold text-text-primary">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="app-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-h1 font-semibold text-text-primary">Upcoming bookings</h2>
          <Link href="/app/bookings" className="text-body font-semibold text-text-primary underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="mt-6 space-y-4">
          {upcoming.length ? (
            upcoming.map((booking) => (
              <div key={booking.id} className="flex flex-col gap-2 border-b border-border-muted/20 pb-4 last:border-b-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-body font-semibold text-text-primary">
                    {booking.serviceType} · {booking.vehicleType}
                  </p>
                  <span className="rounded-full bg-off-white px-3 py-1 text-body text-muted">
                    {booking.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-body text-muted">
                  {booking.pickupLocation} → {booking.dropoffLocation}
                </p>
                <Link
                  href={`/app/bookings/${booking.id}`}
                  className="text-body text-text-primary underline"
                >
                  View details
                </Link>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border-muted/40 bg-off-white/80 p-4 text-body text-muted">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 7V3m8 4V3M4 11h16M5 21h14a1 1 0 001-1v-9a1 1 0 00-1-1H5a1 1 0 00-1 1v9a1 1 0 001 1z" />
              </svg>
              <span>No upcoming bookings yet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
