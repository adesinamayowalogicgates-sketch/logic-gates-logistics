"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WalletAdjustForm({
  userId
}: {
  userId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      userId,
      type: formData.get("type"),
      amount: Number(formData.get("amount")),
      note: formData.get("note")?.toString() || "",
      source: "ADMIN_ADJUSTMENT"
    };

    const response = await fetch("/api/admin/wallet/adjust", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.error || "Unable to adjust wallet");
      return;
    }

    setMessage("Wallet updated.");
    event.currentTarget.reset();
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-body text-muted">
        Adjustment type
        <select
          name="type"
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
        >
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
        </select>
      </label>
      <label className="text-body text-muted">
        Amount (NGN)
        <input
          name="amount"
          type="number"
          min={1}
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          required
        />
      </label>
      <label className="text-body text-muted">
        Reason
        <textarea
          name="note"
          rows={3}
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          required
        />
      </label>
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : "Apply adjustment"}
      </button>
      {message ? <p className="text-body text-muted">{message}</p> : null}
    </form>
  );
}
