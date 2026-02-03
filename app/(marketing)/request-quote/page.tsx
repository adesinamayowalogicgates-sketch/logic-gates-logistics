import type { Metadata } from "next";
import Image from "next/image";
import RequestQuoteForm from "@/components/RequestQuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit your trip details and receive a tailored quote from Logic Gates Logistics."
};

export default function RequestQuotePage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-4xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Request a quote
            </p>
            <h1 className="mt-3 text-h1 font-semibold text-text-primary">
              Tell us about your trip
            </h1>
            <p className="mt-4 text-body text-muted">
              Share the details and our team will respond with availability,
              pricing, and security options for Lagos and the South-West within
              two business hours.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-4 pb-12 sm:pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full">
              <Image
                src="/hero-transport.png"
                alt="Logistics fleet"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/35 via-transparent to-transparent" />
            </div>
          </div>
          <RequestQuoteForm />
        </div>
      </section>
    </div>
  );
}
