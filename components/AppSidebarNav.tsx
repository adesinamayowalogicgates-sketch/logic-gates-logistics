"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["Dashboard", "/app/dashboard"],
  ["Bookings", "/app/bookings"],
  ["New booking", "/app/bookings/new"],
  ["Wallet", "/app/wallet"],
  ["Settings", "/app/settings"]
] as const;

export default function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 space-y-2 text-body">
      {links.map(([label, href]) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`app-sidebar-item ${isActive ? "app-sidebar-item-active" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
