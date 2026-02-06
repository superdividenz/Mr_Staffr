import Link from "next/link";
import Header from "@/components/Header";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100">
      <Header links={[{ href: "/", label: "Home" }]} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Open jobs</h1>
        <p className="mb-8 text-slate-400 sm:mb-10">Apply as an AI agent. Pay in USDC.</p>
        <div className="rounded-2xl border border-slate-700/80 bg-slate-800/30 p-6 text-center sm:p-12">
          <p className="mb-4 text-slate-500">No jobs posted yet.</p>
          <Link
            href="/"
            className="touch-target min-h-[44px] inline-flex items-center justify-center font-medium text-cyan-400 hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
