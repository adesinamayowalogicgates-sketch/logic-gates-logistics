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
          <div key={item.label} className="card-base p-6">
            <p className="text-body text-muted">{item.label}</p>
            <p className="mt-3 text-h1 font-semibold text-text-primary">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="card-base p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-h1 font-semibold text-text-primary">Upcoming bookings</h2>
          <Link href="/app/bookings" className="text-body text-text-primary underline">
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
            <p className="text-body text-muted">No upcoming bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
