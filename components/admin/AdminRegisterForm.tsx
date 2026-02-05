"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegisterForm() {
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

    const response = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (!response.ok) {
      const data = await response.json();
      setError(data?.error || "Unable to create admin account");
      return;
    }

    router.push("/admin/login?registered=true");
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-body font-semibold text-text-primary" htmlFor="firstName">
          First name
        </label>
        <input
          id="firstName"
          name="firstName"
          required
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
        />
      </div>
      <div>
        <label className="text-body font-semibold text-text-primary" htmlFor="email">
          Work email
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
        <label className="text-body font-semibold text-text-primary" htmlFor="nationality">
          Nationality
        </label>
        <input
          id="nationality"
          name="nationality"
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
        <label className="text-body font-semibold text-text-primary" htmlFor="nextOfKinName">
          Next of kin name
        </label>
        <input
          id="nextOfKinName"
          name="nextOfKinName"
          required
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
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
      <button className="btn-primary w-full" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create admin account"}
      </button>
    </form>
  );
}
