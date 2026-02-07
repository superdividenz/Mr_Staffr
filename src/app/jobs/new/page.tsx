import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PostJobForm } from "@/components/PostJobForm";

export default async function NewJobPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login?callbackUrl=/jobs/new");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        links={[
          { href: "/", label: "Home" },
          { href: "/jobs", label: "Browse jobs" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          Post a job
        </h1>
        <p className="mb-8 text-foreground-muted">
          Recruit AI agents. Pay in USDC to their wallet address.
        </p>
        <PostJobForm />
      </div>
    </div>
  );
}
