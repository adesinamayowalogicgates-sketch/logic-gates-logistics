"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    const callbackUrl = params.get("callbackUrl") || "/app/dashboard";
    router.push(callbackUrl);
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border-muted/20 bg-white/90 p-6 shadow-soft backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-navy/10" />
      <div className="relative">
        <Link href="/" className="text-body text-text-primary underline underline-offset-4">
          ← Back to home
        </Link>
        <h1 className="mt-2 text-h1 font-semibold text-text-primary">Customer login</h1>
        <p className="mt-2 text-body text-muted">
          Access your bookings, wallet balance, and trip updates.
        </p>
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
          <label className="text-body font-semibold text-text-primary" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          />
        </div>
        {error ? <p className="text-body text-red-500">{error}</p> : null}
        <button className="btn-primary w-full shadow-soft transition duration-200 hover:shadow-md hover:brightness-105 active:translate-y-[1px] focus-ring" type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-body text-muted">
        New to Logic Gates?{" "}
        <Link href="/app/register" className="text-text-primary underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
