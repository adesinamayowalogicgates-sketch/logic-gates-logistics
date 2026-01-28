import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { serviceCards, trustItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Secure, reliable transport across South-West Nigeria for individuals and businesses. Book premium cars, buses, trucks, and airport pickups."
};

export default function HomePage() {
  return (
    <div>
      <section className="hero-glow relative overflow-hidden bg-off-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:flex-row lg:items-center lg:pt-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal">
              Trusted Nigerian logistics partner
            </p>
            <h1 className="mt-4 text-h1 font-semibold text-text-primary">
              Safe, on-time transport for people, teams, and business cargo.
            </h1>
            <p className="mt-5 text-body text-muted">
              Logic Gates Logistics delivers premium mobility and logistics
              across South-West Nigeria. Whether you are booking a personal
              pickup or managing fleet movement for your organization, we pair
              vetted drivers with GPS oversight and calm coordination for every
              trip.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/request-quote"
                className="btn-primary w-full sm:w-auto"
              >
                Book Personal Travel
              </Link>
              <Link
                href="/business"
                className="btn-secondary w-full sm:w-auto"
              >
                Business Solutions
              </Link>
              <Link
                href="/services"
                className="text-body font-semibold text-text-primary hover:opacity-80 focus-ring"
              >
                View all services
              </Link>
            </div>
          </div>
          <div className="w-full max-w-lg">
            <div className="rounded-2xl bg-navy p-8 text-white shadow-card">
              <h3 className="text-h1 font-semibold">
                South-West coverage with careful expansion.
              </h3>
              <p className="mt-4 text-body text-white/80">
                Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti are live today. We grow
                responsibly by onboarding vetted drivers and trusted partners
                before opening new routes.
              </p>
              <div className="mt-6 grid gap-4 text-body">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-teal"></span>
                  <span>Real-time trip tracking and dispatch updates.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-teal"></span>
                  <span>Dedicated coordinators for business accounts.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-teal"></span>
                  <span>Flexible booking for individuals and enterprises.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-grid bg-off-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="card-base p-6"
              >
                <p className="text-body font-semibold text-text-primary">{item.title}</p>
                <p className="mt-3 text-body text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading
            eyebrow="Services"
            title="Transport options built for calm, control, and safety"
            subtitle="Choose the service that matches your trip. Every booking includes vetted drivers, GPS oversight, and coordinated scheduling."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {serviceCards.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <SectionHeading
              eyebrow="Business"
              title="Dedicated logistics for teams, projects, and enterprises"
              subtitle="We handle recurring routes, multi-vehicle deployments, and on-demand fleet support for corporate, school, and government partners."
            />
          </div>
          <div className="flex-1 card-base p-8">
            <ul className="space-y-4 text-body text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal"></span>
                <span>Fleet coordination dashboards with daily reporting.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal"></span>
                <span>Contracted drivers trained in corporate protocol.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal"></span>
                <span>Flexible billing for monthly, project, or ad-hoc work.</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/business"
                className="text-body font-semibold text-text-primary hover:opacity-80 focus-ring"
              >
              See business solutions →

              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-h1 font-semibold">
                Ready for a safer, calmer transport experience?
              </h2>
              <p className="mt-4 text-body text-white/80">
                Request a quote in minutes. Our team will confirm availability,
                vehicle options, and security preferences.
              </p>
            </div>
            <Link
              href="/request-quote"
              className="btn-outline w-full sm:w-auto"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
