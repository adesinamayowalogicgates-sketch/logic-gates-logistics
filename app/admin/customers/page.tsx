import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      walletBalance: true,
      _count: { select: { bookings: true } },
      bookings: {
        select: { pickupTime: true },
        orderBy: { pickupTime: "desc" },
        take: 1
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-body text-muted">Admin</p>
        <h1 className="text-h1 font-semibold text-text-primary">Customers</h1>
      </div>

      <div className="card-base overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-body text-text-primary">
          <thead className="border-b border-border-muted/20 bg-off-white/60 text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Bookings</th>
              <th className="px-4 py-3">Wallet</th>
              <th className="px-4 py-3">Last booking</th>
            </tr>
          </thead>
          <tbody>
            {customers.length ? (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border-muted/20">
                  <td className="px-4 py-3 font-semibold text-text-primary">
                    <Link href={`/admin/customers/${customer.id}`} className="underline">
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{customer.email}</td>
                  <td className="px-4 py-3 text-muted">{customer.phone}</td>
                  <td className="px-4 py-3 text-muted">{customer._count.bookings}</td>
                  <td className="px-4 py-3 font-semibold text-text-primary">
                    NGN {customer.walletBalance.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {customer.bookings[0]
                      ? new Date(customer.bookings[0].pickupTime).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-muted">
                  No customers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
