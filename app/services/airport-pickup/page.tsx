import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Airport Pickup",
  description:
    "Meet-and-greet airport transfers with flight tracking and secure transport in South-West Nigeria."
};

export default function AirportPickupPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Airport pickup"
            title="On-time arrivals and calm departures"
            subtitle="We track flights, coordinate arrivals, and deliver safe transfers for individuals, executives, and corporate guests."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-border-muted/20 bg-off-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Pricing hint
            </p>
            <p className="mt-3 text-body text-muted">
              From NGN 45,000 per trip for Lagos airport transfers. Pricing
              varies by terminal, wait time, and vehicle type.
            </p>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Use cases
              </p>
              <ul className="mt-3 space-y-2 text-body text-muted">
                {[
                  "Executive pickups for corporate travelers",
                  "Family arrivals with luggage handling",
                  "Flight-delay monitored transfers"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Flight monitoring with adjusted pickup times.",
              "Meet-and-greet support for VIP guests.",
              "Professional drivers with airport access protocols.",
              "Options for executive cars, buses, or security escorts."
            ].map((item) => (
              <div key={item} className="card-base p-6">
                <p className="text-body font-semibold text-text-primary">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/request-quote"
              className="btn-primary w-full sm:w-auto"
            >
              Request a Quote
            </Link>
            <Link
              href="/services"
              className="btn-outline w-full sm:w-auto"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
