import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Logic Gates Logistics for bookings, support, or business partnerships."
};

export default function ContactPage() {
  return (
    <div className="bg-off-white">
      <section className="bg-off-white">
        <div className="mx-auto w-full max-w-5xl px-4 pb-10 pt-12 sm:pb-12 sm:pt-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Contact"
            title="We are ready to coordinate your next trip"
            subtitle="Reach our Lagos-based coordination team for bookings, partnership discussions, or urgent support."
          />
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-5xl px-4 pb-12 sm:pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <ContactForm />
            <div className="space-y-6">
              <div className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-h1 font-semibold text-text-primary">
                  Company details
                </h3>
                <div className="mt-4 space-y-3 text-body text-muted">
                  <p>hello@logicgateslogistics.com</p>
                  <p>+234 (0) 700 555 0101</p>
                  <p>Lagos, Nigeria</p>
                </div>
              </div>
              <div className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-h1 font-semibold text-text-primary">
                  Service areas
                </h3>
                <p className="mt-3 text-body text-muted">
                  We currently cover Lagos, Ogun, Oyo, Osun, Ondo, and Ekiti, with
                  expansion plans across the South-West corridor.
                </p>
                <ul className="mt-4 grid gap-2 text-body text-muted sm:grid-cols-2">
                  {[
                    "Lagos",
                    "Ogun",
                    "Oyo",
                    "Osun",
                    "Ondo",
                    "Ekiti"
                  ].map((area) => (
                    <li key={area} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal/80"></span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-base p-6 transition duration-200 ease-out hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-h1 font-semibold text-text-primary">Response times</h3>
                <p className="mt-3 text-body text-muted">
                  Our coordinators respond within two hours during business days
                  and provide emergency response options for active trips.
                </p>
                <div className="mt-6 rounded-xl bg-off-white p-4 text-body text-muted">
                  Office hours: 8:00am - 8:00pm (Mon-Sat)
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl">
                <div className="relative h-40 w-full">
                  <Image
                    src="/map-coverage.png"
                    alt="Coverage map"
                    fill
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy/35 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
