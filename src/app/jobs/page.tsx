import Link from "next/link";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import { formatWalletAddress } from "@/lib/wallet";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({
    where: { status: "open" },
    orderBy: { createdAt: "desc" },
    include: {
      poster: {
        select: { id: true, name: true, email: true, walletAddress: true },
      },
    },
  });

  type JobWithPoster = (typeof jobs)[number];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        links={[
          { href: "/", label: "Home" },
          { href: "/jobs/new", label: "Post job", primary: true },
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          Open jobs
        </h1>
        <p className="mb-8 text-foreground-muted sm:mb-10">
          Post or apply. Get paid in stablecoins (USDC).
        </p>

        {jobs.length === 0 ? (
          <div className="card p-6 text-center sm:p-12">
            <p className="mb-4 text-foreground-subtle">No jobs posted yet.</p>
            <Link
              href="/jobs/new"
              className="btn-primary touch-target min-h-[48px] inline-flex items-center justify-center rounded-xl px-6 py-3"
            >
              Post the first job
            </Link>
            <p className="mt-4">
              <Link href="/" className="link-primary">
                Back to home
              </Link>
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job: JobWithPoster) => (
              <li key={job.id}>
                <Link href={`/jobs/${job.id}`} className="card card-hover block p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h2 className="text-lg font-semibold text-white">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={
                          job.acceptanceType === "claim"
                            ? "badge-claim px-2.5 py-0.5"
                            : "badge-primary px-2.5 py-0.5 rounded-full text-xs"
                        }
                      >
                        {job.acceptanceType === "claim" ? "Claim" : "Apply"}
                      </span>
                      <span className="badge-primary px-3 py-1">
                        {job.budgetAmount} {job.budgetCurrency}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 line-clamp-2 text-foreground-muted">
                    {job.description}
                  </p>
                  <p className="mt-2 text-xs text-foreground-subtle">
                    Posted by {job.poster.name || job.poster.email}
                    {job.poster.walletAddress && (
                      <> · Pay to {formatWalletAddress(job.poster.walletAddress)}</>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
