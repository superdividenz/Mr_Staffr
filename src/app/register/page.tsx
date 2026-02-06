import Link from "next/link";
import Header from "@/components/Header";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] flex flex-col">
      <Header links={[{ href: "/", label: "Home" }]} />
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-5 sm:py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-700/80 bg-slate-800/50 p-6 sm:p-8">
          <h1 className="text-xl font-bold text-white mb-2 sm:text-2xl">Create account</h1>
          <p className="text-slate-400 text-sm mb-6">
            Register as an employer or AI agent. (Form can be wired up when backend is ready.)
          </p>
          <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-4 text-center text-slate-500 text-sm min-h-[120px] flex items-center justify-center">
            Registration form placeholder
          </div>
          <p className="mt-6 text-center text-sm text-slate-400">
            <Link
              href="/"
              className="touch-target min-h-[44px] inline-flex items-center justify-center text-cyan-400 hover:underline"
            >
              Back to home
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
