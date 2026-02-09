"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type MessageState = { type: "error" | "success"; text: string } | null;

export default function VerifyOtpPage() {
  const params = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState>(null);
  const [cooldown, setCooldown] = useState(0);
  const [backoffIndex, setBackoffIndex] = useState(0);
  const cooldownSteps = [30, 60, 120];

  useEffect(() => {
    const nextEmail = params.get("email") || "";
    setEmail(nextEmail);
    if (!nextEmail) {
      setMessage({ type: "error", text: "Missing email. Please return to registration and try again." });
    }
  }, [params]);

  useEffect(() => {
    if (!email) return;
    const cooldownKey = `otpCooldown:${email}`;
    const backoffKey = `otpBackoff:${email}`;
    const storedUntil = Number(localStorage.getItem(cooldownKey));
    if (storedUntil && storedUntil > Date.now()) {
      setCooldown(Math.ceil((storedUntil - Date.now()) / 1000));
    }
    const storedBackoff = Number(localStorage.getItem(backoffKey));
    if (!Number.isNaN(storedBackoff)) {
      setBackoffIndex(Math.min(Math.max(0, storedBackoff), cooldownSteps.length - 1));
    }
  }, [email]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    if (!email || cooldown > 0) return;
    localStorage.removeItem(`otpCooldown:${email}`);
  }, [cooldown, email]);

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
      setMessage({ type: "error", text: data?.error || "Unable to verify code." });
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
      const retryAfter = Number(data?.retryAfter || 0);
      if (retryAfter > 0) {
        setCooldown(retryAfter);
        localStorage.setItem(`otpCooldown:${email}`, String(Date.now() + retryAfter * 1000));
      }
      setMessage({ type: "error", text: data?.error || "Unable to resend code." });
      return;
    }

    const nextDuration = cooldownSteps[backoffIndex] ?? cooldownSteps[cooldownSteps.length - 1];
    const nextIndex = Math.min(backoffIndex + 1, cooldownSteps.length - 1);
    setBackoffIndex(nextIndex);
    localStorage.setItem(`otpBackoff:${email}`, String(nextIndex));
    setCooldown(nextDuration);
    localStorage.setItem(`otpCooldown:${email}`, String(Date.now() + nextDuration * 1000));
    setMessage({ type: "success", text: "A new code has been sent." });
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
            ref={inputRef}
            onChange={(event) => {
              if (message) setMessage(null);
              setOtp(event.target.value.replace(/\D/g, ""));
            }}
            className="app-input"
          />
        </div>
        {message ? (
          <p className={`text-body ${message.type === "error" ? "text-red-500" : "text-emerald-600"}`}>
            {message.text}
          </p>
        ) : null}
        <button className="app-btn-primary w-full" type="submit" disabled={loading || otp.length !== 6 || !email}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      <div className="relative mt-4">
        <button
          type="button"
          className="app-btn-secondary w-full"
          onClick={handleResend}
          disabled={loading || cooldown > 0 || !email}
        >
          {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
        </button>
      </div>
    </div>
  );
}
