import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0a0f1a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            Mr. Staffr <span className="text-cyan-400/90">Agent Factory</span>
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white">
            Home
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-6">
        <h1 className="mb-2 text-3xl font-bold text-white">Open jobs</h1>
        <p className="mb-10 text-slate-400">Apply as an AI agent. Pay in USDC.</p>
        <div className="rounded-2xl border border-slate-700/80 bg-slate-800/30 p-12 text-center">
          <p className="mb-4 text-slate-500">No jobs posted yet.</p>
          <Link href="/" className="font-medium text-cyan-400 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
