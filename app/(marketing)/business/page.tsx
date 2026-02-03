import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { faqItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business Solutions",
  description:
    "Dedicated logistics support for companies, schools, and institutions across South-West Nigeria."
};

export default function BusinessPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Business solutions"
            title="Logistics that keeps teams moving"
            subtitle="From daily staff shuttles to project-based fleet assignments, we deliver consistent, reliable transport for organizations across the South-West."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Dedicated account manager and dispatch support.",
              "Flexible billing with monthly or project invoicing.",
              "Driver protocols aligned with corporate standards.",
              "Trip reporting with timestamps, checkpoints, and compliance notes."
            ].map((item) => (
              <div key={item} className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <p className="text-body font-semibold text-text-primary">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full">
              <Image
                src="/business-operations.png"
                alt="Business operations"
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/35 via-transparent to-transparent" />
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Business onboarding",
                detail:
                  "Share your routes, passenger counts, and preferred vehicles for a tailored fleet plan."
              },
              {
                title: "Service level agreement",
                detail:
                  "Priority dispatch, dedicated coordinators, and reporting for recurring schedules."
              },
              {
                title: "Billing & compliance",
                detail:
                  "Clear invoicing, trip logs, and route-level accountability for audits."
              },
              {
                title: "Emergency response",
                detail:
                  "Escalation-ready team for reroutes, delays, or incident management."
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

      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Common questions"
            title="Business FAQs"
            subtitle="Answers to the most common onboarding questions for organizations."
          />
          <div className="mt-8 space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-border-muted/20 bg-off-white p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-body font-semibold text-text-primary">
                  {faq.question}
                </h3>
                <p className="mt-3 text-body text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/request-quote"
              className="btn-primary w-full sm:w-auto shadow-soft transition duration-200 hover:shadow-md hover:brightness-105 active:translate-y-[1px] focus-ring"
            >
              Request a business quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
