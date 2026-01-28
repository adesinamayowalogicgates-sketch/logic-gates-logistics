import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function WalletPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || "";

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { walletBalance: true }
  });

  const transactions = await prisma.walletTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary">Wallet</h1>
        <p className="text-body text-muted">Track credits and payment records.</p>
      </div>

      <div className="card-base p-6">
        <p className="text-body text-muted">Current balance</p>
        <p className="mt-3 text-h1 font-semibold text-text-primary">
          NGN {(user?.walletBalance ?? 0).toLocaleString()}
        </p>
        <div className="mt-4 rounded-xl border border-dashed border-border-muted/40 bg-off-white px-4 py-3 text-body text-muted">
          Top ups via Paystack are coming soon. For now, contact support or ask an admin to credit your wallet.
        </div>
      </div>

      <div className="card-base p-6">
        <h2 className="text-h1 font-semibold text-text-primary">Transactions</h2>
        <div className="mt-4 space-y-3 text-body text-muted">
          {transactions.length ? (
            transactions.map((tx) => (
              <div key={tx.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border-muted/20 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <p className="text-body font-semibold text-text-primary">
                    {tx.type === "CREDIT" ? "Credit" : "Debit"} · {tx.source}
                  </p>
                  <p className="text-body text-muted">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                  {tx.note ? (
                    <p className="text-body text-muted">{tx.note}</p>
                  ) : null}
                </div>
                <span className="text-body font-semibold text-text-primary">
                  {tx.type === "DEBIT" ? "-" : "+"} NGN {tx.amount.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-body text-muted">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
