"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

interface AppHeaderProps {
  name?: string | null;
}

export default function AppHeader({ name }: AppHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-body text-muted">Welcome back</p>
        <h1 className="text-h1 font-semibold text-text-primary">
          {name || "Customer"}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/app/bookings/new" className="app-btn-primary">
          New booking
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/app/login" })}
          className="app-btn-secondary"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
