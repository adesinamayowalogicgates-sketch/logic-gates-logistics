import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Truck Hire",
  description:
    "Secure truck hire and fleet delivery for cargo movement with GPS tracking and vetted drivers."
};

export default function TruckHirePage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Truck hire"
            title="Secure cargo transport with full visibility"
            subtitle="Move goods with confidence. We provide vetted drivers, GPS oversight, and coordinated loading schedules."
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
              From NGN 180,000 per trip for light-duty trucks. Pricing depends
              on cargo type, distance, and security support.
            </p>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                Use cases
              </p>
              <ul className="mt-3 space-y-2 text-body text-muted">
                {[
                  "Retail distribution between Lagos and Ibadan",
                  "Construction material deliveries",
                  "Warehouse-to-branch transfer runs"
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
              "Light and heavy-duty options for urban and interstate deliveries.",
              "GPS tracking with route visibility for stakeholders.",
              "Compliance-focused drivers with cargo handling training.",
              "Optional security escort for high-value shipments."
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
