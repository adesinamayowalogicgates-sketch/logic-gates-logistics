"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  vehicleClass: string;
  pickup: string;
  destination: string;
  date: string;
  pickupTime: string;
  returnTrip: boolean;
  returnDate: string;
  returnTime: string;
  passengers: string;
  securityOption: string;
  luggageOrCargo: string;
  isBusiness: boolean;
  notes: string;
  website: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  service: "",
  vehicleClass: "",
  pickup: "",
  destination: "",
  date: "",
  pickupTime: "",
  returnTrip: false,
  returnDate: "",
  returnTime: "",
  passengers: "",
  securityOption: "",
  luggageOrCargo: "",
  isBusiness: false,
  notes: "",
  website: ""
};

export default function RequestQuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Enter a valid email.";
    }
    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";
    if (form.isBusiness && !form.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }
    if (!form.service) nextErrors.service = "Select a service.";
    if (!form.vehicleClass) nextErrors.vehicleClass = "Select a vehicle class.";
    if (!form.pickup.trim()) nextErrors.pickup = "Pickup location is required.";
    if (!form.date.trim()) nextErrors.date = "Travel date is required.";
    if (!form.pickupTime.trim()) nextErrors.pickupTime = "Pickup time is required.";
    if (form.returnTrip && !form.returnDate.trim()) {
      nextErrors.returnDate = "Return date is required.";
    }
    if (form.returnTrip && !form.returnTime.trim()) {
      nextErrors.returnTime = "Return time is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const checked =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : false;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setStatus("sending");

    try {
      const response = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("sent");
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-base p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.name)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="Your name"
          />
          {errors.name ? (
            <p className="mt-2 text-xs text-red-500">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.email)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="name@email.com"
          />
          {errors.email ? (
            <p className="mt-2 text-xs text-red-500">{errors.email}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.phone)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="+234"
          />
          {errors.phone ? (
            <p className="mt-2 text-xs text-red-500">{errors.phone}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="companyName">
            Company name (if business)
          </label>
          <input
            id="companyName"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.companyName)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="Organization name"
          />
          {errors.companyName ? (
            <p className="mt-2 text-xs text-red-500">{errors.companyName}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="service">
            Service
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.service)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          >
            <option value="">Select a service</option>
            <option value="Luxury Car Hire">Luxury Car Hire</option>
            <option value="Bus Hire">Bus Hire</option>
            <option value="Truck Hire">Truck Hire</option>
            <option value="Airport Pickup">Airport Pickup</option>
          </select>
          {errors.service ? (
            <p className="mt-2 text-xs text-red-500">{errors.service}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="vehicleClass">
            Vehicle class
          </label>
          <select
            id="vehicleClass"
            name="vehicleClass"
            value={form.vehicleClass}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.vehicleClass)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          >
            <option value="">Select a class</option>
            <option value="Executive Sedan">Executive Sedan</option>
            <option value="Premium SUV">Premium SUV</option>
            <option value="Bus">Bus</option>
            <option value="Truck">Truck</option>
          </select>
          {errors.vehicleClass ? (
            <p className="mt-2 text-xs text-red-500">{errors.vehicleClass}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="pickup">
            Pickup location
          </label>
          <input
            id="pickup"
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.pickup)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="Ikeja, Lagos"
          />
          {errors.pickup ? (
            <p className="mt-2 text-xs text-red-500">{errors.pickup}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="destination">
            Destination (optional)
          </label>
          <input
            id="destination"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="Victoria Island, Lagos"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="date">
            Travel date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.date)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          />
          {errors.date ? (
            <p className="mt-2 text-xs text-red-500">{errors.date}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="pickupTime">
            Pickup time
          </label>
          <input
            id="pickupTime"
            name="pickupTime"
            type="time"
            value={form.pickupTime}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.pickupTime)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          />
          {errors.pickupTime ? (
            <p className="mt-2 text-xs text-red-500">{errors.pickupTime}</p>
          ) : null}
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="passengers">
            Passengers / load size
          </label>
          <input
            id="passengers"
            name="passengers"
            value={form.passengers}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="e.g. 3 passengers"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="securityOption">
            Security option
          </label>
          <select
            id="securityOption"
            name="securityOption"
            value={form.securityOption}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          >
            <option value="">Select an option</option>
            <option value="None">No security escort</option>
            <option value="Escort">Security escort (on request)</option>
          </select>
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="luggageOrCargo">
            Luggage or cargo details
          </label>
          <input
            id="luggageOrCargo"
            name="luggageOrCargo"
            value={form.luggageOrCargo}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="e.g. 4 suitcases, 1 pallet"
          />
        </div>
        <div className="md:col-span-2">
          <label className="inline-flex items-center gap-3 text-body text-muted">
            <input
              type="checkbox"
              name="returnTrip"
              checked={form.returnTrip}
              onChange={handleChange}
              className="h-4 w-4 rounded border-border-muted/30 text-teal focus-ring"
            />
            Add a return trip
          </label>
        </div>
        {form.returnTrip ? (
          <>
            <div>
              <label className="text-body font-semibold text-text-primary" htmlFor="returnDate">
                Return date
              </label>
              <input
                id="returnDate"
                name="returnDate"
                type="date"
                value={form.returnDate}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.returnDate)}
                className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
              />
              {errors.returnDate ? (
                <p className="mt-2 text-xs text-red-500">{errors.returnDate}</p>
              ) : null}
            </div>
            <div>
              <label className="text-body font-semibold text-text-primary" htmlFor="returnTime">
                Return time
              </label>
              <input
                id="returnTime"
                name="returnTime"
                type="time"
                value={form.returnTime}
                onChange={handleChange}
                required
                aria-invalid={Boolean(errors.returnTime)}
                className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
              />
              {errors.returnTime ? (
                <p className="mt-2 text-xs text-red-500">{errors.returnTime}</p>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      <div className="hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6">
        <label className="text-body font-semibold text-text-primary" htmlFor="notes">
          Additional details
        </label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          placeholder="Security requirements, pickup schedule, special requests"
        />
      </div>

      <label className="mt-6 flex items-center gap-3 text-body text-muted">
        <input
          type="checkbox"
          name="isBusiness"
          checked={form.isBusiness}
          onChange={handleChange}
          className="h-4 w-4 rounded border-border-muted/30 text-teal focus-ring"
        />
        This request is for a business or organization.
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-4" aria-live="polite">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Submit request"}
        </button>
        {status === "sent" ? (
          <p className="text-body text-teal">Thank you. We will reach out shortly.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-body text-red-500">
            Something went wrong. Please try again.
          </p>
        ) : null}
      </div>
    </form>
  );
}
