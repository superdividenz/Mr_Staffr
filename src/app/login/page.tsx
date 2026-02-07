import Link from "next/link";
import Header from "@/components/Header";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header links={[{ href: "/", label: "Home" }]} />
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="card w-full max-w-md p-6 sm:p-8">
          <h1 className="text-xl font-bold text-white mb-2 sm:text-2xl">
            Sign in
          </h1>
          <p className="text-foreground-muted text-sm mb-6">
            Sign in with your email and password.
          </p>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-foreground-muted">
            No account?{" "}
            <Link href="/register" className="link-primary font-medium">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
