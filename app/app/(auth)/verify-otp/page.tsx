"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setEmail(params.get("email") || "");
  }, [params]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.error || "Unable to verify code.");
      return;
    }

    router.replace("/app/login?verified=true");
  };

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data?.error || "Unable to resend code.");
      return;
    }

    setCooldown(60);
    setMessage("A new code has been sent.");
  };

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border-muted/20 bg-white/90 p-6 shadow-soft backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-teal/10 via-transparent to-navy/10" />
      <div className="relative space-y-3">
        <h1 className="text-h1 font-semibold text-text-primary">Verify your email</h1>
        <p className="text-body text-muted">
          Enter the 6-digit code sent to <span className="font-semibold">{email}</span>.
        </p>
      </div>

      <form className="relative mt-6 space-y-4" onSubmit={handleVerify}>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="otp">
            Verification code
          </label>
          <input
            id="otp"
            name="otp"
            inputMode="numeric"
            maxLength={6}
            required
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            className="app-input"
          />
        </div>
        {message ? <p className="text-body text-red-500">{message}</p> : null}
        <button className="app-btn-primary w-full" type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      <div className="relative mt-4">
        <button
          type="button"
          className="app-btn-secondary w-full"
          onClick={handleResend}
          disabled={loading || cooldown > 0}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </button>
      </div>
    </div>
  );
}
