import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { pricingTable } from "@/lib/constants";

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
          <div className="mb-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full">
              <Image
                src="/service-truck.png"
                alt="Truck hire"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/35 via-transparent to-transparent" />
            </div>
          </div>
          <div className="mb-8 rounded-2xl border border-border-muted/20 bg-off-white p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-teal/40 hover:shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
              Pricing hint
            </p>
            <p className="mt-3 text-body text-muted">
              From NGN 180,000 per trip for light-duty trucks. Pricing depends
              on cargo type, distance, and security support.
            </p>
            <div className="mt-4 rounded-xl border border-border-muted/20 bg-white p-4">
              <p className="text-body font-semibold text-text-primary">
                Vehicle pricing (starting)
              </p>
              <ul className="mt-3 space-y-2 text-body text-muted">
                {Object.entries(pricingTable.Intercity).map(([vehicle, amount]) => (
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
                  "Retail distribution between Lagos and Ibadan",
                  "Construction material deliveries",
                  "Warehouse-to-branch transfer runs"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-teal/80"></span>
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
              <div key={item} className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <p className="text-body font-semibold text-text-primary">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/request-quote"
              className="btn-primary w-full sm:w-auto shadow-soft transition duration-200 hover:shadow-md hover:brightness-105 active:translate-y-[1px] focus-ring"
            >
              Request a Quote
            </Link>
            <Link
              href="/services"
              className="btn-outline w-full sm:w-auto transition duration-200 hover:shadow-md active:translate-y-[1px] focus-ring"
            >
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
