import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { pricingTable } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bus Hire",
  description:
    "Comfortable buses for corporate shuttles, schools, and event transportation across South-West Nigeria."
};

export default function BusHirePage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Bus hire"
            title="Reliable group transport for teams and events"
            subtitle="Move staff, students, or guests with scheduled pickups, route planning, and consistent driver support."
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
              From NGN 140,000 per day depending on bus size and route. Pricing
              adjusts for multi-day and long-distance schedules.
            </p>
            <div className="mt-4 rounded-xl border border-border-muted/20 bg-white p-4">
              <p className="text-body font-semibold text-text-primary">
                Vehicle pricing (starting)
              </p>
              <ul className="mt-3 space-y-2 text-body text-muted">
                {Object.entries(pricingTable["Bus hire"]).map(([vehicle, amount]) => (
                  <li key={vehicle} className="flex items-center justify-between">
                    <span>{vehicle}</span>
                    <span>NGN {amount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Use cases
              </p>
              <ul className="mt-3 space-y-2 text-body text-muted">
                {[
                  "Staff shuttles for business parks",
                  "School excursions across the South-West",
                  "Guest movement for conferences and events"
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
              "Comfortable seating with climate control and tidy interiors.",
              "Route planning for daily shuttles or event movement.",
              "Dedicated coordinators for large group logistics.",
              "Flexible booking for single trips or recurring schedules."
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
