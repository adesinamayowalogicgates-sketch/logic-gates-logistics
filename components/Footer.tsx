import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Safety", href: "/safety" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Business", href: "/business" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Customer Portal", href: "/app/login" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" }
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/90 ring-1 ring-black/5">

  <Image
  src="/brand/shield.svg"
  alt="Logic Gates Logistics"
  width={40}
  height={40}
  className="h-10 w-10 opacity-90"
/>

</div>

            <p className="mt-3 text-body text-white/80">
              Trusted transport for individuals and businesses. Serving South-West
              Nigeria today with safe expansion plans for tomorrow.
            </p>
            <div className="mt-5 space-y-2 text-body text-white/80">
              <p>hello@logicgateslogistics.com</p>
              <p>+234 (0) 700 555 0101</p>
              <p>Lagos, Nigeria (South-West coverage)</p>
            </div>
          </div>

          <div>
            <h3 className="text-body font-semibold uppercase tracking-wide text-white/60">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-body">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/80 underline decoration-transparent underline-offset-4 transition duration-200 ease-out hover:text-white hover:decoration-white/60 focus-ring focus-visible:decoration-white/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/admin/login" className="btn-outline mt-4 inline-flex">
              Admin Portal
            </Link>
          </div>

          <div>
            <h3 className="text-body font-semibold uppercase tracking-wide text-white/60">
              Social
            </h3>
            <ul className="mt-4 space-y-2 text-body text-white/80">
              <li>LinkedIn (coming soon)</li>
              <li>Instagram (coming soon)</li>
              <li>Twitter/X (coming soon)</li>
            </ul>
          </div>
        </div>

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="border-t border-white/10 pt-6 text-xs text-white/60">
          <p>
            (c) {new Date().getFullYear()} Logic Gates Logistics. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
