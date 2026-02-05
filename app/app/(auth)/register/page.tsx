"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: `${formData.get("firstName") ?? ""} ${formData.get("lastName") ?? ""}`.trim(),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      gender: formData.get("gender"),
      dateOfBirth: formData.get("dateOfBirth"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      nationality: formData.get("nationality"),
      nextOfKinName: formData.get("nextOfKinName"),
      nextOfKinGender: formData.get("nextOfKinGender"),
      nextOfKinPhone: formData.get("nextOfKinPhone"),
      company: formData.get("company"),
      password: formData.get("password")
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.error || "Unable to create account");
      return;
    }

    router.push("/app/login?registered=true");
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border-muted/20 bg-white/90 p-6 shadow-soft backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-navy/10" />
      <div className="relative">
        <Link href="/" className="text-body text-text-primary underline underline-offset-4">
          ← Back to home
        </Link>
        <h1 className="mt-2 text-h1 font-semibold text-text-primary">Create account</h1>
        <p className="mt-2 text-body text-muted">
          Register to manage bookings across Lagos and the South-West.
        </p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="gender">
            Gender
          </label>
          <input
            id="gender"
            name="gender"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="dateOfBirth">
            Date of birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="nationality">
            Nationality
          </label>
          <input
            id="nationality"
            name="nationality"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="company">
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="nextOfKinName">
            Next of kin name
          </label>
          <input
            id="nextOfKinName"
            name="nextOfKinName"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="nextOfKinGender">
            Next of kin gender
          </label>
          <input
            id="nextOfKinGender"
            name="nextOfKinGender"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="nextOfKinPhone">
            Next of kin phone number
          </label>
          <input
            id="nextOfKinPhone"
            name="nextOfKinPhone"
            required
            className="app-input"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="app-input"
          />
        </div>
        {error ? <p className="text-body text-red-500">{error}</p> : null}
        <button className="app-btn-primary w-full" type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-body text-muted">
        Already have an account?{" "}
        <Link href="/app/login" className="text-text-primary underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
