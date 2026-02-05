"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    nationality: "",
    nextOfKinName: "",
    nextOfKinGender: "",
    nextOfKinPhone: "",
    company: ""
  });
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
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          gender: data?.gender || "",
          dateOfBirth: data?.dateOfBirth || "",
          phone: data?.phone || "",
          nationality: data?.nationality || "",
          nextOfKinName: data?.nextOfKinName || "",
          nextOfKinGender: data?.nextOfKinGender || "",
          nextOfKinPhone: data?.nextOfKinPhone || "",
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

    const payload = {
      ...form,
      name: `${form.firstName} ${form.lastName}`.trim()
    };

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
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

      <form className="app-card p-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
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
            value={form.lastName}
            onChange={handleChange}
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
            value={form.gender}
            onChange={handleChange}
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
            value={form.dateOfBirth}
            onChange={handleChange}
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
            value={form.phone}
            onChange={handleChange}
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
            value={form.nationality}
            onChange={handleChange}
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
            value={form.company}
            onChange={handleChange}
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
            value={form.nextOfKinName}
            onChange={handleChange}
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
            value={form.nextOfKinGender}
            onChange={handleChange}
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
            value={form.nextOfKinPhone}
            onChange={handleChange}
            className="app-input"
          />
        </div>
        <button className="app-btn-primary" type="submit" disabled={status === "saving"}>
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
