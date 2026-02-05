export const dynamic = "force-dynamic";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-surface">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
