import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase() || "";
  const role = session?.user?.role?.toLowerCase() || "";

  if (session && email.endsWith("@logicgatesindustries.com") && (role === "admin" || role === "ops")) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border-muted/20 bg-white p-6">
      <h1 className="text-h1 font-semibold text-text-primary">Admin Login</h1>
      <p className="mt-2 text-body text-muted">
        Sign in with your Logic Gates Industries admin account.
      </p>
      {session ? (
        <p className="mt-6 text-body text-red-500">Not authorized for admin access.</p>
      ) : (
        <AdminLoginForm />
      )}
    </div>
  );
}
