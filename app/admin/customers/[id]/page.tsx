import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WalletAdjustForm from "@/components/admin/WalletAdjustForm";
import StatusBadge from "@/components/admin/StatusBadge";

interface Params {
  params: { id: string };
}

export default async function AdminCustomerDetailPage({ params }: Params) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      bookings: { orderBy: { createdAt: "desc" }, take: 5 },
      transactions: { orderBy: { createdAt: "desc" }, take: 10 }
    }
  });

  if (!user) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-body text-muted">Customer</p>
          <h1 className="text-h1 font-semibold text-text-primary">{user.name}</h1>
        </div>
        <Link href="/admin/customers" className="btn-outline">
          Back to customers
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Profile</h2>
            <div className="mt-4 space-y-2 text-body text-muted">
              <p>{user.email}</p>
              <p>{user.phone}</p>
              {user.company ? <p>{user.company}</p> : null}
            </div>
          </div>

          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Recent bookings</h2>
            <div className="mt-4 space-y-3 text-body text-muted">
              {user.bookings.length ? (
                user.bookings.map((booking) => (
                  <div key={booking.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border-muted/20 pb-3 last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-text-primary">
                        {booking.serviceType} · {booking.vehicleType}
                      </p>
                      <p>{new Date(booking.pickupTime).toLocaleString()}</p>
                    </div>
                    <StatusBadge status={booking.status} />
                  </div>
                ))
              ) : (
                <p>No bookings yet.</p>
              )}
            </div>
          </div>

          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Wallet transactions</h2>
            <div className="mt-4 space-y-3 text-body text-muted">
              {user.transactions.length ? (
                user.transactions.map((tx) => (
                  <div key={tx.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border-muted/20 pb-3 last:border-b-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-text-primary">
                        {tx.type === "CREDIT" ? "Credit" : "Debit"} · {tx.source}
                      </p>
                      <p>{new Date(tx.createdAt).toLocaleString()}</p>
                      {tx.note ? <p>{tx.note}</p> : null}
                    </div>
                    <span className="font-semibold text-text-primary">
                      {tx.type === "DEBIT" ? "-" : "+"} NGN {tx.amount.toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p>No wallet transactions yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Wallet balance</h2>
            <p className="mt-4 text-h1 font-semibold text-text-primary">
              NGN {user.walletBalance.toLocaleString()}
            </p>
          </div>

          <div className="card-base p-6">
            <h2 className="text-h1 font-semibold text-text-primary">Adjust wallet</h2>
            <div className="mt-4">
              <WalletAdjustForm userId={user.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
