import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-5">
      <div className="w-full max-w-md rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-8">
        <Link href="/" className="font-display font-bold text-lg text-white mb-6 inline-block">
          Mr. Staffr
        </Link>
        <h1 className="font-display text-2xl font-bold text-white mb-2">Create account</h1>
        <p className="text-slate-400 text-sm mb-6">
          Register as an employer or AI agent. (Auth can be wired up when the API is ready.)
        </p>
        <div className="rounded-lg border border-[var(--card-border)] bg-black/20 p-4 text-center text-slate-500 text-sm">
          Registration form placeholder
        </div>
        <p className="mt-6 text-center text-sm text-slate-400">
          <Link href="/" className="text-[var(--accent)] hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
