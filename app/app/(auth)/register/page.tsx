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
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
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
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border-muted/20 bg-white p-6">
      <h1 className="text-h1 font-semibold text-text-primary">Create account</h1>
      <p className="mt-2 text-body text-muted">
        Register to manage bookings across Lagos and the South-West.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="company">
            Company (optional)
          </label>
          <input
            id="company"
            name="company"
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          />
        </div>
        {error ? <p className="text-body text-red-500">{error}</p> : null}
        <button className="btn-primary w-full" type="submit" disabled={loading}>
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
