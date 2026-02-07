import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { formatWalletAddress } from "@/lib/wallet";
import { ApplyButton } from "@/components/ApplyButton";
import { ClaimButton } from "@/components/ClaimButton";

export default async function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      poster: {
        select: {
          id: true,
          name: true,
          email: true,
          walletAddress: true,
        },
      },
      applications: {
        include: {
          applicant: {
            select: {
              id: true,
              name: true,
              email: true,
              walletAddress: true,
            },
          },
        },
      },
    },
  });

  if (!job) notFound();

  const isPoster = session?.user?.id === job.poster.id;
  type ApplicationWithApplicant = (typeof job.applications)[number];
  const hasApplied = session?.user?.id
    ? job.applications.some((a: ApplicationWithApplicant) => a.applicantId === session.user!.id)
    : false;
  const isClaimType = job.acceptanceType === "claim";
  const acceptedApplication = job.applications.find((a: ApplicationWithApplicant) => a.status === "accepted");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        links={[
          { href: "/", label: "Home" },
          { href: "/jobs", label: "Jobs" },
          { href: "/jobs/new", label: "Post job", primary: true },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
        <Link href="/jobs" className="mb-6 inline-block text-sm link-primary">
          ← Back to jobs
        </Link>

        <div className="card p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {job.title}
            </h1>
            <span className="badge-primary px-4 py-2 text-lg font-semibold">
              {job.budgetAmount} {job.budgetCurrency}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-foreground-subtle">
              Status: <span className="capitalize text-foreground-muted">{job.status}</span>
            </span>
            {job.status === "open" && (
              <span
                className={
                  isClaimType ? "badge-claim px-2.5 py-0.5" : "badge-primary rounded-full px-2.5 py-0.5 text-xs"
                }
              >
                {isClaimType ? "First to claim" : "Apply"}
              </span>
            )}
          </div>
          <div className="mt-6 whitespace-pre-wrap text-foreground-muted">
            {job.description}
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <p className="text-sm text-foreground-muted">
              Posted by {job.poster.name || job.poster.email}
              {job.poster.walletAddress && (
                <>
                  {" "}
                  · Payments to {formatWalletAddress(job.poster.walletAddress)}
                </>
              )}
            </p>
          </div>

          {job.status === "open" && !isPoster && session?.user && !hasApplied && (
            <div className="mt-8 border-t border-slate-700/80 pt-6">
              {isClaimType ? (
                <ClaimButton jobId={job.id} />
              ) : (
                <ApplyButton jobId={job.id} />
              )}
            </div>
          )}

          {job.status === "open" && !session?.user && (
            <p className="mt-8 border-t border-border pt-6 text-foreground-muted">
              <Link href={`/login?callbackUrl=/jobs/${job.id}`} className="link-primary">
                Sign in
              </Link>{" "}
              to {isClaimType ? "claim" : "apply"}.
            </p>
          )}

          {hasApplied && (
            <p className="mt-8 border-t border-border pt-6 text-primary">
              {acceptedApplication?.applicantId === session?.user?.id
                ? "You claimed this job. Complete the work to get paid in USDC."
                : "You have applied to this job."}
            </p>
          )}

          {job.status === "filled" && acceptedApplication && (
            <p className="mt-8 border-t border-border pt-6 text-foreground-muted">
              Claimed by {acceptedApplication.applicant.name || acceptedApplication.applicant.email}
              {acceptedApplication.applicant.walletAddress && (
                <> · Pay to {acceptedApplication.applicant.walletAddress}</>
              )}
            </p>
          )}

          {isPoster && job.applications.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <h2 className="mb-3 font-semibold text-white">
                Applications ({job.applications.length})
              </h2>
              <ul className="space-y-3">
                {job.applications.map((app: ApplicationWithApplicant) => (
                  <li key={app.id} className="card p-4">
                    <p className="font-medium text-white">
                      {app.applicant.name || app.applicant.email}
                    </p>
                    {app.coverMessage && (
                      <p className="mt-1 text-sm text-foreground-muted">
                        {app.coverMessage}
                      </p>
                    )}
                    {app.applicant.walletAddress && (
                      <p className="mt-1 font-mono text-xs text-foreground-subtle">
                        Pay to: {app.applicant.walletAddress}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
