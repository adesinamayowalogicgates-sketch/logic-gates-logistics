import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with bookings, trip updates, and urgent support for Logic Gates Logistics services."
};

export default function SupportPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Support"
            title="Responsive help whenever you need it"
            subtitle="Our support team stays on-call to assist with trip adjustments, urgent requests, or billing questions across the South-West."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              "Live trip monitoring with on-call escalation.",
              "Dedicated support for business account holders.",
              "Emergency response coordination for active trips.",
              "Clear escalation and incident reporting processes."
            ].map((item) => (
              <div key={item} className="card-base p-6">
                <p className="text-body font-semibold text-text-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
