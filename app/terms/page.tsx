import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Read the booking terms and service conditions for Logic Gates Logistics."
};

export default function TermsPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-4xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Terms"
            title="Service terms and booking guidelines"
            subtitle="These terms outline bookings, cancellations, and service expectations for Logic Gates Logistics."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="card-base p-6 text-body text-muted">
            <p>
              By booking a service with Logic Gates Logistics, you agree to our
              scheduling, payment, and safety policies. Cancellations should be
              communicated at least 24 hours in advance to avoid penalties.
            </p>
            <p className="mt-4">
              We reserve the right to adjust routes based on safety and traffic
              conditions across the South-West. Clients are responsible for
              providing accurate pickup details and ensuring passengers comply
              with safety instructions.
            </p>
            <p className="mt-4">
              Pricing is confirmed in writing before service. Business accounts
              may receive customized service agreements covering recurring
              routes, fleet assignment, and dedicated coordinators.
            </p>
            <p className="mt-4">
              Late pickups due to incorrect details, last-minute changes, or
              extended wait times may incur additional charges. We will notify
              clients before any adjustments are applied.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
