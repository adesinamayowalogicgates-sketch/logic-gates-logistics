import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { pricingTable } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Luxury Car Hire",
  description:
    "Chauffeured premium vehicles for executives, weddings, and VIP guests across South-West Nigeria."
};

export default function LuxuryCarHirePage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Luxury car hire"
            title="Premium chauffeur service with quiet confidence"
            subtitle="Arrive in style with vetted chauffeurs, spotless vehicles, and coordinated pickup plans for executives and high-value guests."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full">
              <Image
                src="/service-luxury.png"
                alt="Luxury car hire"
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
              From NGN 85,000 per day for executive sedans. Final pricing depends
              on hours, route distance, and security requirements.
            </p>
            <div className="mt-4 rounded-xl border border-border-muted/20 bg-white p-4">
              <p className="text-body font-semibold text-text-primary">
                Vehicle pricing (starting)
              </p>
              <ul className="mt-3 space-y-2 text-body text-muted">
                {Object.entries(pricingTable.Luxury).map(([vehicle, amount]) => (
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
                  "Executive transport for board meetings",
                  "Wedding convoys and VIP arrivals",
                  "Media, government, and investor visits"
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
              "Executive sedans and SUVs maintained to premium standards.",
              "Discreet coordination for VIP, media, and wedding parties.",
              "GPS-tracked trips with dedicated trip coordinators.",
              "Optional security personnel on request."
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
