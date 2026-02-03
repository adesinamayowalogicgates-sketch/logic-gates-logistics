import type { Metadata } from "next";
import Image from "next/image";
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
  const trustIcons = [
    <svg key="shield" viewBox="0 0 24 24" className="h-5 w-5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v6c0 4.4-3 8.1-7 9-4-0.9-7-4.6-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>,
    <svg key="lock" viewBox="0 0 24 24" className="h-5 w-5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 11V8a5 5 0 0110 0v3" />
      <rect x="5" y="11" width="14" height="10" rx="2" />
    </svg>,
    <svg key="gps" viewBox="0 0 24 24" className="h-5 w-5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
      <circle cx="12" cy="12" r="9" />
    </svg>,
    <svg key="support" viewBox="0 0 24 24" className="h-5 w-5 text-teal" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12a8 8 0 0116 0" />
      <path d="M4 12v3a2 2 0 002 2h2v-6H6a2 2 0 00-2 2z" />
      <path d="M20 12v3a2 2 0 01-2 2h-2v-6h2a2 2 0 012 2z" />
      <path d="M8 19h8" />
    </svg>
  ];

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
                className="btn-primary w-full sm:w-auto shadow-soft transition duration-200 hover:shadow-md hover:brightness-105 active:translate-y-[1px] focus-ring"
              >
                Book Personal Travel
              </Link>
              <Link
                href="/business"
                className="btn-secondary w-full sm:w-auto shadow-soft transition duration-200 hover:shadow-md hover:brightness-105 active:translate-y-[1px] focus-ring"
              >
                Business Solutions
              </Link>
              <Link
                href="/services"
                className="group text-body font-semibold text-text-primary transition hover:underline hover:underline-offset-4 focus-ring"
              >
                View all services{" "}
                <span className="inline-block transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
          <div className="w-full max-w-lg space-y-6">
            <div className="relative overflow-hidden rounded-3xl shadow-card transition duration-300 ease-out hover:shadow-lg hover:scale-[1.01] animate-fade-in">
              <Image
                src="/hero-transport.png"
                alt="Logic Gates Logistics fleet"
                width={640}
                height={420}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/40 via-transparent to-transparent" />
            </div>
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
            {trustItems.map((item, index) => (
              <div
                key={item.title}
                className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-teal/40 hover:shadow-soft"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-off-white">
                  {trustIcons[index]}
                </div>
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
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading
            eyebrow="Trust"
            title="Trusted by individuals and operational teams"
            subtitle="We support executive travel, staff movement, and secure cargo runs across Lagos and the South-West."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "Our airport pickups are always on time and our executive team feels safe.",
                role: "Executive Assistant, Lagos",
                avatar: "/avatar-1.png"
              },
              {
                quote:
                  "The dispatch updates keep our staff shuttles predictable and stress-free.",
                role: "Operations Lead, Ikeja",
                avatar: "/avatar-2.png"
              },
              {
                quote:
                  "Cargo deliveries were tracked end-to-end with clear reporting.",
                role: "Supply Manager, Oyo",
                avatar: "/avatar-3.png"
              }
            ].map((item) => (
              <div key={item.role} className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <p className="text-body text-muted">"{item.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={item.role}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full ring-2 ring-teal/20"
                  />
                  <p className="text-body font-semibold text-text-primary">
                    {item.role}
                  </p>
                </div>
              </div>
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
            <div className="relative mb-6 overflow-hidden rounded-2xl">
              <Image
                src="/business-operations.png"
                alt="Business operations"
                width={720}
                height={420}
                className="h-44 w-full object-cover transition duration-300 ease-out hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
            </div>
            <ul className="space-y-4 text-body text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal/80"></span>
                <span>Fleet coordination dashboards with daily reporting.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal/80"></span>
                <span>Contracted drivers trained in corporate protocol.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal/80"></span>
                <span>Flexible billing for monthly, project, or ad-hoc work.</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/business"
                className="group text-body font-semibold text-text-primary transition hover:underline hover:underline-offset-4 focus-ring"
              >
                See business solutions{" "}
                <span className="inline-block transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading
            eyebrow="Operations"
            title="Clear response times and trip standards"
            subtitle="We keep clients informed with dispatch updates, insurance coverage, and documented trip reporting."
          />
          <div className="mt-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full">
              <Image
                src="/map-coverage.png"
                alt="South-West coverage map"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/35 via-transparent to-transparent" />
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Response time",
                detail: "Quotes within 2 business hours for standard requests."
              },
              {
                title: "Service hours",
                detail: "Trips scheduled daily, with priority coverage in Lagos."
              },
              {
                title: "Cancellation window",
                detail: "Notify us 24 hours ahead to avoid late cancellation fees."
              }
            ].map((item) => (
              <div key={item.title} className="card-base p-6">
                <p className="text-body font-semibold text-text-primary">
                  {item.title}
                </p>
                <p className="mt-3 text-body text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 opacity-30 section-grid" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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
              className="btn-outline w-full sm:w-auto transition duration-200 hover:shadow-md hover:scale-[1.01] hover:ring-2 hover:ring-teal/30 focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy active:translate-y-[1px]"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
