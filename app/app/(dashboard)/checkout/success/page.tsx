import Link from "next/link";

export default async function CheckoutSuccessPage({
  searchParams
}: {
  searchParams: { reference?: string };
}) {
  const reference = searchParams.reference;
  let status = "pending";
  let amount: number | null = null;

  if (reference) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/paystack/verify?reference=${reference}`, {
      cache: "no-store"
    });
    const data = await response.json();
    status = data.status || "pending";
    amount = data.data?.amount ? Math.round(data.data.amount / 100) : null;
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div className="app-card p-6">
        <h1 className="text-h1 font-semibold text-text-primary">Payment received</h1>
        <p className="mt-2 text-body text-muted">
          {!reference
            ? "No payment reference was provided."
            : status === "success"
              ? "Your payment has been confirmed."
              : "We are verifying your payment. Check back shortly."}
        </p>
        <div className="mt-4 text-body text-muted">
          <p>Reference: {reference}</p>
          {amount ? <p>Amount: NGN {amount.toLocaleString()}</p> : null}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/app/bookings" className="app-btn-primary">
            View bookings
          </Link>
          <Link href="/app/dashboard" className="app-btn-secondary">
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
