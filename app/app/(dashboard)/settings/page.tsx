"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({ name: "", phone: "", company: "" });
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );

  useEffect(() => {
    const loadProfile = async () => {
      const response = await fetch("/api/profile");
      const data = await response.json();
      if (response.ok) {
        setForm({
          name: data?.name || "",
          phone: data?.phone || "",
          company: data?.company || ""
        });
      }
    };
    loadProfile();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("saving");

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setStatus(response.ok ? "saved" : "error");
    setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div>
        <h1 className="text-h1 font-semibold text-text-primary">Profile settings</h1>
        <p className="text-body text-muted">Keep your contact details up to date.</p>
      </div>

      <form className="card-base p-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="name">
            Full name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
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
            value={form.phone}
            onChange={handleChange}
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
            value={form.company}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          />
        </div>
        <button className="btn-primary" type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : "Save changes"}
        </button>
        {status === "saved" ? (
          <p className="text-body text-teal">Profile updated.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-body text-red-500">Unable to update profile.</p>
        ) : null}
      </form>
    </div>
  );
}
