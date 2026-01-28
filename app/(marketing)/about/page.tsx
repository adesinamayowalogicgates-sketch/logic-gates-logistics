import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Logic Gates Logistics and our commitment to reliable, secure transport in Nigeria."
};

export default function AboutPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About us"
            title="A logistics company built on trust and clarity"
            subtitle="Logic Gates Logistics is a Nigerian transport company focused on safe, well-coordinated mobility for people and cargo across the South-West."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-base p-6">
              <h3 className="text-h1 font-semibold text-text-primary">Our mission</h3>
              <p className="mt-3 text-body text-muted">
                To make transport in Nigeria calm, predictable, and safe for
                individuals, teams, and enterprises by combining strong
                operational discipline with modern monitoring.
              </p>
            </div>
            <div className="card-base p-6">
              <h3 className="text-h1 font-semibold text-text-primary">Our coverage</h3>
              <p className="mt-3 text-body text-muted">
                We currently operate across Lagos, Ogun, Oyo, Osun, Ondo, and
                Ekiti, with expansion plans guided by safety assessments and
                partner quality.
              </p>
            </div>
            <div className="card-base p-6">
              <h3 className="text-h1 font-semibold text-text-primary">Our values</h3>
              <p className="mt-3 text-body text-muted">
                Professionalism, transparency, and accountability from booking
                to arrival, with clear reporting for business clients.
              </p>
            </div>
            <div className="card-base p-6">
              <h3 className="text-h1 font-semibold text-text-primary">Our promise</h3>
              <p className="mt-3 text-body text-muted">
                Clear pricing, responsive support, and consistent service whether
                you are booking one car or coordinating a multi-vehicle fleet.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
