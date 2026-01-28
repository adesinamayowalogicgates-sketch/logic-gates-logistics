"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statusOptions = [
  "DRAFT",
  "PENDING_PAYMENT",
  "PAID",
  "ASSIGNED",
  "COMPLETED",
  "CANCELLED"
];

export function BookingStatusForm({
  bookingId,
  status
}: {
  bookingId: string;
  status: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: value })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.error || "Unable to update status");
      return;
    }

    setMessage("Status updated.");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-body text-muted">
        Booking status
        <select
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : "Update status"}
      </button>
      {message ? <p className="text-body text-muted">{message}</p> : null}
    </form>
  );
}

export function BookingAssignForm({
  bookingId,
  driverName,
  driverPhone,
  vehicleLabel,
  securityAssigned,
  securityNotes
}: {
  bookingId: string;
  driverName?: string | null;
  driverPhone?: string | null;
  vehicleLabel?: string | null;
  securityAssigned?: boolean | null;
  securityNotes?: string | null;
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
      driverName: formData.get("driverName")?.toString() || null,
      driverPhone: formData.get("driverPhone")?.toString() || null,
      vehicleLabel: formData.get("vehicleLabel")?.toString() || null,
      securityAssigned: formData.get("securityAssigned") === "on",
      securityNotes: formData.get("securityNotes")?.toString() || null
    };

    const response = await fetch(`/api/admin/bookings/${bookingId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.error || "Unable to update assignment");
      return;
    }

    setMessage("Assignment updated.");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-body text-muted">
          Driver name
          <input
            name="driverName"
            defaultValue={driverName ?? ""}
            className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          />
        </label>
        <label className="text-body text-muted">
          Driver phone
          <input
            name="driverPhone"
            defaultValue={driverPhone ?? ""}
            className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          />
        </label>
      </div>
      <label className="text-body text-muted">
        Vehicle label
        <input
          name="vehicleLabel"
          defaultValue={vehicleLabel ?? ""}
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
        />
      </label>
      <label className="flex items-center gap-2 text-body text-muted">
        <input
          type="checkbox"
          name="securityAssigned"
          defaultChecked={Boolean(securityAssigned)}
          className="h-4 w-4 rounded border-border-muted/40"
        />
        Security assigned
      </label>
      <label className="text-body text-muted">
        Security notes
        <textarea
          name="securityNotes"
          defaultValue={securityNotes ?? ""}
          rows={3}
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
        />
      </label>
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : "Save assignment"}
      </button>
      {message ? <p className="text-body text-muted">{message}</p> : null}
    </form>
  );
}

export function BookingOverrideForm({
  bookingId,
  overrideAmount,
  overrideReason
}: {
  bookingId: string;
  overrideAmount?: number | null;
  overrideReason?: string | null;
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
      overrideAmount: Number(formData.get("overrideAmount")),
      overrideReason: formData.get("overrideReason")?.toString() || ""
    };

    const response = await fetch(
      `/api/admin/bookings/${bookingId}/override-price`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.error || "Unable to override price");
      return;
    }

    setMessage("Pricing override saved.");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="text-body text-muted">
        Override amount (NGN)
        <input
          name="overrideAmount"
          type="number"
          min={0}
          defaultValue={overrideAmount ?? ""}
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          required
        />
      </label>
      <label className="text-body text-muted">
        Reason
        <textarea
          name="overrideReason"
          defaultValue={overrideReason ?? ""}
          rows={3}
          className="mt-2 w-full rounded-xl border border-border-muted/40 bg-white px-3 py-2 text-body text-text-primary"
          required
        />
      </label>
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : "Save override"}
      </button>
      {message ? <p className="text-body text-muted">{message}</p> : null}
    </form>
  );
}
