import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const now = new Date();
  const day = now.getDay();
  const diff = (day + 6) % 7;
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const [weeklyTotal, pendingPayment, paid, assigned, completed] = await prisma.$transaction([
    prisma.booking.count({
      where: { createdAt: { gte: startOfWeek } }
    }),
    prisma.booking.count({ where: { status: "PENDING_PAYMENT" } }),
    prisma.booking.count({ where: { status: "PAID" } }),
    prisma.booking.count({ where: { status: "ASSIGNED" } }),
    prisma.booking.count({ where: { status: "COMPLETED" } })
  ]);

  const cards = [
    { label: "Bookings this week", value: weeklyTotal },
    { label: "Pending payment", value: pendingPayment },
    { label: "Paid", value: paid },
    { label: "Assigned", value: assigned },
    { label: "Completed", value: completed }
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body text-muted">Admin Dashboard</p>
        <h1 className="text-h1 font-semibold text-text-primary">Operations snapshot</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="card-base p-6">
            <p className="text-body text-muted">{card.label}</p>
            <p className="mt-4 text-h1 font-semibold text-text-primary">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
