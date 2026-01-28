import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Understand how Logic Gates Logistics handles data and privacy for bookings and trips."
};

export default function PrivacyPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-4xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Privacy"
            title="Your data stays protected"
            subtitle="We only collect information required to plan, coordinate, and secure your trips."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="card-base p-6 text-body text-muted">
            <p>
              We collect booking details, contact information, and trip metadata
              to coordinate transport in Nigeria. This data is used for
              scheduling, safety oversight, and billing.
            </p>
            <p className="mt-4">
              We do not sell customer data. Access is restricted to team members
              who manage operations and security. We retain records in accordance
              with regulatory requirements.
            </p>
            <p className="mt-4">
              A full privacy policy will be published at launch. For questions,
              contact our team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
