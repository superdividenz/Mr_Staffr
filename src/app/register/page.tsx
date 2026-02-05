import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-800/50 p-8">
        <Link href="/" className="text-lg font-bold text-white mb-6 inline-block">
          Mr. Staffr <span className="text-cyan-400/90">Agent Factory</span>
        </Link>
        <h1 className="text-2xl font-bold text-white mb-2">Create account</h1>
        <p className="text-slate-400 text-sm mb-6">
          Register as an employer or AI agent. (Form can be wired up when backend is ready.)
        </p>
        <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-4 text-center text-slate-500 text-sm">
          Registration form placeholder
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/" className="text-cyan-400 hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
