import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Logic Gates Logistics plans, assigns, and monitors every transport request across South-West Nigeria."
};

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Share your trip details",
      description:
        "Tell us the service type, pickup points, timing, and any security needs in Lagos or the South-West."
    },
    {
      title: "We confirm the right fleet",
      description:
        "Our coordinators assign vetted drivers and vehicles that match your request and budget."
    },
    {
      title: "Track the journey",
      description:
        "We monitor every trip with GPS and stay available for changes or urgent support."
    },
    {
      title: "Post-trip reporting",
      description:
        "Businesses receive summaries, invoices, and feedback to keep operations smooth."
    }
  ];

  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title="A clear process from booking to arrival"
            subtitle="We remove uncertainty with a simple, well-coordinated workflow for every customer in Nigeria."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step.title} className="card-base p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
                  Step {index + 1}
                </p>
                <h3 className="mt-3 text-h1 font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-body text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/request-quote"
              className="btn-primary w-full sm:w-auto"
            >
              Start a booking
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
