import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { serviceCards } from "@/lib/site";
import { pricingTable } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore luxury car hire, bus hire, truck hire, and airport pickup services across South-West Nigeria."
};

export default function ServicesPage() {
  const serviceDetails = [
    {
      title: "Luxury Car Hire",
      priceHint: "From NGN 85,000 per day (route dependent)",
      useCases: [
        "Executive airport transfers in Lagos",
        "Wedding convoy coordination",
        "VIP guest movement for events"
      ],
      href: "/services/luxury-car-hire"
    },
    {
      title: "Bus Hire",
      priceHint: "From NGN 140,000 per day (size dependent)",
      useCases: [
        "Staff shuttle routes for offices",
        "School trip movement",
        "Event guest transportation"
      ],
      href: "/services/bus-hire"
    },
    {
      title: "Truck Hire",
      priceHint: "From NGN 180,000 per trip (cargo dependent)",
      useCases: [
        "Retail distribution between Lagos and Oyo",
        "Project site deliveries",
        "Warehouse-to-branch transfers"
      ],
      href: "/services/truck-hire"
    },
    {
      title: "Airport Pickup",
      priceHint: "From NGN 45,000 per trip (vehicle dependent)",
      useCases: [
        "Corporate guest arrivals",
        "Family pickups with luggage support",
        "Flight-delay monitored transfers"
      ],
      href: "/services/airport-pickup"
    }
  ];

  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
          <SectionHeading
            eyebrow="Services hub"
            title="Transport solutions for every scale"
            subtitle="Choose a service tailored for personal trips, group movement, or enterprise logistics. All services include vetted drivers and GPS tracking."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {serviceCards.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
          <SectionHeading
            eyebrow="Pricing guidance"
            title="Transparent hints, tailored quotes"
            subtitle="Final pricing depends on route distance, vehicle type, timing, and security needs. Request a quote for exact pricing."
          />
          <div className="mt-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full">
              <Image
                src="/map-coverage.png"
                alt="Coverage map"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/35 via-transparent to-transparent" />
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {serviceDetails.map((service) => (
              <div
                key={service.title}
                className="rounded-2xl border border-border-muted/20 bg-off-white p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-teal/40 hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-h1 font-semibold text-text-primary">
                    {service.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                    Pricing hint
                  </span>
                </div>
                <p className="mt-3 text-body text-muted">
                  {service.priceHint}
                </p>
                <div className="mt-4 rounded-xl border border-border-muted/20 bg-white p-4">
                  <p className="text-body font-semibold text-text-primary">
                    Vehicle pricing (starting)
                  </p>
                  <ul className="mt-3 space-y-2 text-body text-muted">
                    {Object.entries(pricingTable[service.title as keyof typeof pricingTable] ?? {}).map(([vehicle, amount]) => (

                      <li key={vehicle} className="flex items-center justify-between">
                        <span>{vehicle}</span>
                        <span>NGN {amount.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                  Use cases
                </p>
                <ul className="mt-3 space-y-2 text-body text-muted">
                  {service.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-teal/80"></span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <Link
                    href="/request-quote"
                    className="group text-body font-semibold text-text-primary transition hover:underline hover:underline-offset-4 focus-ring"
                  >
                    Request a quote{" "}
                    <span className="inline-block transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
