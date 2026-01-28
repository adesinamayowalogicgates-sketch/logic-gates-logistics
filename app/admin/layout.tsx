import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-off-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-muted/20 bg-white px-6 py-4">
          <div>
            <p className="text-body font-semibold text-text-primary">Admin Ops</p>
            <p className="text-body text-muted">{session?.user?.email}</p>
          </div>
          <Link href="/app/logout" className="btn-outline">
            Logout
          </Link>
        </header>
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full rounded-2xl border border-border-muted/20 bg-white p-4 lg:w-64">
            <div className="space-y-1 text-body">
              <p className="text-body font-semibold text-text-primary">Admin navigation</p>
              <p className="text-body text-muted">Manage operations</p>
            </div>
            <nav className="mt-6 space-y-2 text-body">
              {[
                ["Dashboard", "/admin/dashboard"],
                ["Bookings", "/admin/bookings"],
                ["Customers", "/admin/customers"]
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="block rounded-xl px-3 py-3 text-body text-text-primary transition hover:bg-off-white focus-ring"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
