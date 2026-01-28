"use client";

import { useState } from "react";

export default function PaystackPayButton({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.error || "Unable to initialize payment");
      return;
    }

    if (data.authorizationUrl) {
      window.location.href = data.authorizationUrl;
    }
  };

  return (
    <div>
      <button type="button" className="btn-primary w-full" onClick={handlePay} disabled={loading}>
        {loading ? "Redirecting..." : "Pay now"}
      </button>
      {error ? <p className="mt-3 text-body text-red-500">{error}</p> : null}
    </div>
  );
}
