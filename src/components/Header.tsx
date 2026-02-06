"use client";

import Link from "next/link";
import { useState } from "react";

export type NavLink = { href: string; label: string; primary?: boolean };

export default function Header({ links }: { links: NavLink[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0a0f1a]/90 backdrop-blur-md safe-area-padding">
      <div className="mx-auto flex h-14 min-h-[44px] max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="touch-target flex items-center text-lg font-bold tracking-tight text-white"
          aria-label="Mr. Staffr Agent Factory home"
        >
          Mr. Staffr <span className="text-cyan-400/90">Agent Factory</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 md:flex md:gap-6" aria-label="Main">
          {links.map(({ href, label, primary }) =>
            primary ? (
              <Link
                key={href}
                href={href}
                className="touch-target inline-flex items-center justify-center rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-opacity hover:opacity-90 min-h-[44px]"
              >
                {label}
              </Link>
            ) : (
              <Link
                key={href}
                href={href}
                className="text-sm text-slate-400 transition-colors hover:text-white py-2 min-h-[44px] inline-flex items-center"
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile: hamburger when multiple links, else direct link(s) */}
        {links.length > 1 ? (
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="touch-target inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
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
          <nav className="flex items-center md:hidden" aria-label="Main">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="touch-target min-h-[44px] inline-flex items-center rounded-lg px-4 text-sm text-slate-400 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Mobile menu panel (full width below header bar) */}
      {links.length > 1 && (
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-slate-800/80 bg-[#0a0f1a] md:hidden ${menuOpen ? "block" : "hidden"}`}
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
                    ? "bg-cyan-500 text-gray-900 hover:opacity-90"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
