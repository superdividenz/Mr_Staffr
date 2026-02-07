"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function AuthLinks() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="text-sm text-foreground-subtle py-2 min-h-[44px] inline-flex items-center">
        …
      </span>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/profile"
          className="btn-secondary touch-target min-h-[44px] inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium"
        >
          Profile
        </Link>
        <span className="text-sm text-foreground-muted truncate max-w-[100px] sm:max-w-[160px]" title={session.user.email ?? undefined}>
          {session.user.email ?? session.user.name ?? "Signed in"}
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn-secondary touch-target min-h-[44px] inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="btn-secondary touch-target min-h-[44px] inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium"
      >
        Sign in
      </Link>
      <Link
        href="/register"
        className="btn-primary touch-target min-h-[44px] inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm"
      >
        Register
      </Link>
    </div>
  );
}
