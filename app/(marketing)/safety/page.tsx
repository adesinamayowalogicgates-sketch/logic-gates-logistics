import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Safety",
  description:
    "Learn how Logic Gates Logistics keeps every trip secure with vetted drivers, GPS monitoring, and optional security personnel."
};

export default function SafetyPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Safety first"
            title="Security systems that protect every journey"
            subtitle="We combine driver screening, live trip monitoring, and on-demand security support to keep riders and cargo safe across the South-West."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full">
              <Image
                src="/service-security.png"
                alt="Security escort"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/35 via-transparent to-transparent" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Driver background checks and reference validation in Nigeria.",
              "GPS tracking with dispatch oversight for all active trips.",
              "Route planning that avoids high-risk corridors and delays.",
              "Optional security personnel for executive or sensitive movement.",
              "Dedicated support desk for rapid coordination or emergencies.",
              "Vehicle maintenance logs reviewed before every assignment."
            ].map((item) => (
              <div key={item} className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <p className="text-body font-semibold text-text-primary">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Insurance coverage",
                detail:
                  "Trips are covered under partner vehicle insurance and verified documentation."
              },
              {
                title: "Licensed operations",
                detail:
                  "We work with registered transport providers and verified fleet owners."
              },
              {
                title: "Escalation protocols",
                detail:
                  "Dedicated response team coordinates incident handling and rerouting."
              },
              {
                title: "Client privacy",
                detail:
                  "Trip data is restricted to operations staff and retained securely."
              }
            ].map((item) => (
              <div key={item.title} className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <p className="text-body font-semibold text-text-primary">
                  {item.title}
                </p>
                <p className="mt-3 text-body text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
