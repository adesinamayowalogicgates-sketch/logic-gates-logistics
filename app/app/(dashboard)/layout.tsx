import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AppSidebarNav from "@/components/AppSidebarNav";

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="app-surface">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="app-sidebar w-full p-4 lg:w-64">
            <div className="space-y-1 text-body">
              <p className="text-body font-semibold text-text-primary">
                Customer Portal
              </p>
              <p className="text-body text-muted">{session?.user?.email}</p>
            </div>
            <AppSidebarNav />
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
