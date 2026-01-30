import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminRegisterForm from "@/components/admin/AdminRegisterForm";

export default async function AdminRegisterPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase() || "";
  const role = session?.user?.role?.toLowerCase() || "";

  if (session && email.endsWith("@logicgatesindustries.com") && (role === "admin" || role === "ops")) {
    redirect("/admin");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border-muted/20 bg-white p-6">
      <h1 className="text-h1 font-semibold text-text-primary">Admin Registration</h1>
      <p className="mt-2 text-body text-muted">
        Create an admin account with your Logic Gates Industries email.
      </p>
      {session ? (
        <p className="mt-6 text-body text-red-500">Not authorized for admin access.</p>
      ) : (
        <AdminRegisterForm />
      )}
    </div>
  );
}
