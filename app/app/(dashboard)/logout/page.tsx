"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/app/login" });
  }, []);

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-border-muted/20 bg-white p-6 text-center">
      <h1 className="text-h1 font-semibold text-text-primary">Signing out</h1>
      <p className="mt-2 text-body text-muted">
        You will be redirected to the login page.
      </p>
      <div className="mt-6">
        <Link href="/app/login" className="app-btn-secondary w-full">
          Return to login
        </Link>
      </div>
    </div>
  );
}
