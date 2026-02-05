"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { serviceTypes, vehicleTypesByService, ServiceType } from "@/lib/constants";

const steps = ["Service", "Trip", "Add-ons", "Review"];

export default function NewBookingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<any>(null);

  const [form, setForm] = useState({
    serviceType: "Bus hire" as ServiceType,
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    pickupTime: "",
    passengers: 1,
    vehicleType: "",
    notes: "",
    securityRequired: false,
    securityQty: 0
  });

  const vehicleOptions = vehicleTypesByService[form.serviceType];

  const update = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const next = async () => {
    setError(null);
    if (step === 1 && (!form.pickupLocation || !form.dropoffLocation || !form.pickupDate || !form.pickupTime)) {
      setError("Please complete trip details.");
      return;
    }
    if (step === 0 && !form.vehicleType) {
      setError("Select a vehicle type.");
      return;
    }
    if (step === 2 && form.securityRequired && form.securityQty < 1) {
      setError("Select security quantity.");
      return;
    }

    if (step === 2) {
      const response = await fetch("/api/bookings/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: form.serviceType,
          vehicleType: form.vehicleType,
          securityQty: form.securityRequired ? form.securityQty : 0
        })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.error || "Unable to price booking");
        return;
      }
      setPrice(data);
    }

    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => setStep((prev) => Math.max(prev - 1, 0));

  const submit = async () => {
    setLoading(true);
    setError(null);

    const pickupTime = new Date(`${form.pickupDate}T${form.pickupTime}:00`).toISOString();

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceType: form.serviceType,
        pickupLocation: form.pickupLocation,
        dropoffLocation: form.dropoffLocation,
        pickupTime,
        passengers: Number(form.passengers),
        vehicleType: form.vehicleType,
        notes: form.notes || undefined,
        securityRequired: form.securityRequired,
        securityQty: form.securityRequired ? form.securityQty : 0,
        priceBreakdown: price || {}
      })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data?.error || "Unable to create booking");
      return;
    }

    router.push(`/app/checkout/${data.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary">New booking</h1>
        <p className="text-body text-muted">
          Create a trip request and proceed to payment.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`rounded-full px-4 py-2 text-body font-semibold transition duration-200 ${
              index === step ? "bg-navy text-white shadow-soft" : "bg-white text-text-primary"
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="app-card p-6 transition duration-200 ease-out animate-fade-in">
        {step === 0 ? (
          <div className="space-y-4">
            <label className="text-body font-semibold text-text-primary">Service type</label>
            <select
              className="app-input"
              value={form.serviceType}
              onChange={(e) => {
                update("serviceType", e.target.value);
                update("vehicleType", "");
              }}
            >
              {serviceTypes.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <label className="text-body font-semibold text-text-primary">Vehicle type</label>
            <select
              className="app-input"
              value={form.vehicleType}
              onChange={(e) => update("vehicleType", e.target.value)}
            >
              <option value="">Select a vehicle</option>
              {vehicleOptions.map((vehicle) => (
                <option key={vehicle} value={vehicle}>
                  {vehicle}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-body font-semibold text-text-primary">Pickup location</label>
              <input
                className="app-input"
                value={form.pickupLocation}
                onChange={(e) => update("pickupLocation", e.target.value)}
              />
            </div>
            <div>
              <label className="text-body font-semibold text-text-primary">Dropoff location</label>
              <input
                className="app-input"
                value={form.dropoffLocation}
                onChange={(e) => update("dropoffLocation", e.target.value)}
              />
            </div>
            <div>
              <label className="text-body font-semibold text-text-primary">Pickup date</label>
              <input
                type="date"
                className="app-input"
                value={form.pickupDate}
                onChange={(e) => update("pickupDate", e.target.value)}
              />
            </div>
            <div>
              <label className="text-body font-semibold text-text-primary">Pickup time</label>
              <input
                type="time"
                className="app-input"
                value={form.pickupTime}
                onChange={(e) => update("pickupTime", e.target.value)}
              />
            </div>
            <div>
              <label className="text-body font-semibold text-text-primary">Passengers</label>
              <input
                type="number"
                min={1}
                className="app-input"
                value={form.passengers}
                onChange={(e) => update("passengers", Number(e.target.value))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-body font-semibold text-text-primary">Notes (optional)</label>
              <textarea
                rows={3}
                className="app-input"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <label className="inline-flex items-center gap-3 text-body text-muted">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border-muted/30 text-teal focus-ring"
                checked={form.securityRequired}
                onChange={(e) => {
                  update("securityRequired", e.target.checked);
                  if (!e.target.checked) {
                    update("securityQty", 0);
                  }
                }}
              />
              Add security personnel
            </label>
            {form.securityRequired ? (
              <div>
                <label className="text-body font-semibold text-text-primary">Quantity</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="app-input"
                  value={form.securityQty}
                  onChange={(e) => update("securityQty", Number(e.target.value))}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4 text-body text-muted">
            <div>
              <p className="text-body font-semibold text-text-primary">Summary</p>
              <p>{form.serviceType} · {form.vehicleType}</p>
              <p>{form.pickupLocation} → {form.dropoffLocation}</p>
              <p>{form.pickupDate} at {form.pickupTime}</p>
              <p>{form.passengers} passengers</p>
              <p>Security: {form.securityRequired ? `Yes (${form.securityQty})` : "No"}</p>
            </div>
            <div className="rounded-xl border border-border-muted/20 bg-off-white p-4">
              <p className="text-body font-semibold text-text-primary">Price breakdown</p>
              <div className="mt-3 space-y-2 text-body text-muted">
                <div className="flex items-center justify-between">
                  <span>Base price ({price?.vehicleType})</span>
                  <span>NGN {price?.basePrice?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Security fee</span>
                  <span>NGN {price?.securityFee?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-text-primary">
                  <span>Total</span>
                  <span>NGN {price?.total?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {error ? <p className="mt-4 text-body text-red-500">{error}</p> : null}

        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <button type="button" className="app-btn-secondary" onClick={back} disabled={step === 0}>
            Back
          </button>
          {step < 3 ? (
            <button type="button" className="app-btn-primary" onClick={next}>
              Continue
            </button>
          ) : (
            <button type="button" className="app-btn-primary" onClick={submit} disabled={loading}>
              {loading ? "Creating..." : "Proceed to payment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
