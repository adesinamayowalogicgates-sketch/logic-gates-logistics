"use client";

import { useState } from "react";

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isBusiness: boolean;
  website: string;
}

const initialState: ContactFormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  isBusiness: false,
  website: ""
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
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
    if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      const response = await fetch("/api/contact", {
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
          <label className="text-body font-semibold text-text-primary" htmlFor="contact-name">
            Full name
          </label>
          <input
            id="contact-name"
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
          <label className="text-body font-semibold text-text-primary" htmlFor="contact-email">
            Email address
          </label>
          <input
            id="contact-email"
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
          <label className="text-body font-semibold text-text-primary" htmlFor="contact-phone">
            Phone number (optional)
          </label>
          <input
            id="contact-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="+234"
          />
        </div>
        <div>
          <label className="text-body font-semibold text-text-primary" htmlFor="contact-subject">
            Subject
          </label>
          <input
            id="contact-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            aria-invalid={Boolean(errors.subject)}
            className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
            placeholder="Booking, partnership, support"
          />
          {errors.subject ? (
            <p className="mt-2 text-xs text-red-500">{errors.subject}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <label className="text-body font-semibold text-text-primary" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errors.message)}
          rows={5}
          className="mt-2 w-full rounded-xl border border-border-muted/30 bg-white px-4 py-3 text-body text-text-primary focus-ring"
          placeholder="Tell us about your request, route, and timeline."
        />
        {errors.message ? (
          <p className="mt-2 text-xs text-red-500">{errors.message}</p>
        ) : null}
      </div>

      <div className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
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
        This enquiry is for a business or organization.
      </label>

      <div className="mt-8 flex flex-wrap items-center gap-4" aria-live="polite">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-primary disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        {status === "sent" ? (
          <p className="text-body text-teal">Message sent. We will respond soon.</p>
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
