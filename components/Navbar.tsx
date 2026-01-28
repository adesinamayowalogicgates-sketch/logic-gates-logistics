"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site";

const NAV_HEIGHT = 72;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-navy/95 shadow-soft backdrop-blur"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6"
          aria-label="Primary"
        >
          <Link href="/" className="flex items-center gap-3 font-semibold">
       <div className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] bg-[#F9F9F9] ring-1 ring-black/10">
  <Image
    src="/brand/shield.svg"
    alt="Logic Gates Logistics"
    width={28}
    height={28}
    className="h-7 w-7"
    priority
  />
</div>

            <span
              className={`hidden text-h1 sm:inline ${
                isScrolled ? "text-white" : "text-text-primary"
              }`}
            >
              Logic Gates Logistics
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-body transition focus-ring ${
                  isScrolled
                    ? "text-white/80 hover:text-white"
                    : "text-muted hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/app/login"
              className={`text-body font-semibold transition focus-ring ${
                isScrolled ? "text-white/80 hover:text-white" : "text-text-primary"
              }`}
            >
              Customer login
            </Link>
            <Link
              href="/request-quote"
              className="btn-primary"
            >
              Request a Quote
            </Link>
          </div>

          <button
            type="button"
            className="flex h-11 items-center gap-2 px-2 text-body text-text-primary md:hidden focus-ring"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span className="font-semibold">Menu</span>
            <span className="text-lg">{isOpen ? "X" : "|||"}</span>
          </button>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden ${
          isOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300`}
      >
        <div className="bg-white px-4 pb-6 pt-2 shadow-soft">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-body text-muted transition hover:bg-off-white hover:text-text-primary focus-ring"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/app/login"
              className="rounded-lg px-3 py-3 text-body text-text-primary transition hover:bg-off-white focus-ring"
              onClick={() => setIsOpen(false)}
            >
              Customer login
            </Link>
            <Link
              href="/request-quote"
              className="btn-primary w-full"
              onClick={() => setIsOpen(false)}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export { NAV_HEIGHT };
