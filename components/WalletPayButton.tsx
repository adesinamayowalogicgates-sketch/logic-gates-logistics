"use client";

import { useState } from "react";

export default function WalletPayButton({
  bookingId,
  disabled,
  walletBalance,
  amount
}: {
  bookingId: string;
  disabled: boolean;
  walletBalance: number;
  amount: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePay = async () => {
    if (disabled) {
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/wallet/pay-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.error || "Unable to pay with wallet");
      return;
    }

    setSuccess("Payment successful. Refresh to see updated status.");
  };

  return (
    <div>
      <button
        type="button"
        className={`w-full ${disabled ? "btn-outline opacity-60" : "btn-secondary"}`}
        onClick={handlePay}
        disabled={loading || disabled}
      >
        {loading ? "Processing..." : "Pay with wallet"}
      </button>
      {disabled ? (
        <p className="mt-2 text-body text-muted">
          Wallet balance NGN {walletBalance.toLocaleString()} · Amount NGN{" "}
          {amount.toLocaleString()}
        </p>
      ) : null}
      {error ? <p className="mt-2 text-body text-red-500">{error}</p> : null}
      {success ? <p className="mt-2 text-body text-emerald-600">{success}</p> : null}
    </div>
  );
}
