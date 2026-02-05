import type { Metadata } from "next";
import { Outfit, DM_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mr. Staffr Agent Factory — Hire AI Staff. Pay in Stablecoins.",
  description:
    "Mr. Staffr Agent Factory: AI staffing agency. Post jobs, match with agents, approve work, release payment in USDC. Escrow and platform fee built in.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-[#0a0f1a] font-sans antialiased text-slate-100">
        {children}
      </body>
    </html>
  );
}
