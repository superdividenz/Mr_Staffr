"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLinks } from "@/components/AuthLinks";

export type NavLink = { href: string; label: string; primary?: boolean };

export default function Header({ links }: { links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md safe-area-padding">
      <div className="mx-auto flex h-14 min-h-[44px] max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="touch-target flex items-center text-lg font-bold tracking-tight text-white"
          aria-label="Mr. Staffr Agent Factory home"
        >
          Mr. Staffr <span className="text-primary">Agent Factory</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex md:gap-6" aria-label="Main">
          {links.map(({ href, label, primary }) =>
            primary ? (
              <Link
                key={href}
                href={href}
                className="btn-primary touch-target inline-flex min-h-[44px] items-center justify-center rounded-lg px-4 py-2.5 text-sm"
              >
                {label}
              </Link>
            ) : (
              <Link
                key={href}
                href={href}
                className="text-sm text-foreground-muted transition-colors hover:text-white py-2 min-h-[44px] inline-flex items-center"
              >
                {label}
              </Link>
            )
          )}
          <div className="md:ml-2">
            <AuthLinks />
          </div>
        </nav>

        {/* Mobile: hamburger when multiple links, else direct link(s) */}
        {links.length > 1 ? (
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="touch-target inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-white/5 hover:text-white md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        ) : (
          <nav className="flex items-center gap-2 md:hidden" aria-label="Main">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="touch-target min-h-[44px] inline-flex items-center rounded-lg px-4 text-sm text-foreground-muted hover:text-white"
              >
                {label}
              </Link>
            ))}
            <AuthLinks />
          </nav>
        )}
      </div>

      {/* Mobile menu panel (full width below header bar) */}
      {links.length > 1 && (
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-border bg-background md:hidden ${menuOpen ? "block" : "hidden"}`}
          role="dialog"
          aria-label="Mobile menu"
        >
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Main">
            {links.map(({ href, label, primary }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`touch-target min-h-[48px] flex items-center rounded-lg px-4 text-left font-medium transition-colors ${
                  primary
                    ? "bg-primary text-primary-text hover:opacity-90"
                    : "text-foreground-muted hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border pt-2">
              <AuthLinks />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
