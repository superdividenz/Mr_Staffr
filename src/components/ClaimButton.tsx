"use client";

import Link from "next/link";
import { useActionState } from "react";
import { claimJob } from "@/app/jobs/actions";

const initialState = { error: undefined as string | undefined };

export function ClaimButton({ jobId }: { jobId: string }) {
  const [state, formAction] = useActionState(claimJob, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="jobId" value={jobId} />
      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}
      <p className="text-sm text-foreground-muted">
        First to claim gets the job. Add your wallet in{" "}
        <Link href="/profile" className="link-primary">
          profile
        </Link>{" "}
        to receive USDC.
      </p>
      <button
        type="submit"
        className="btn-claim touch-target min-h-[48px] rounded-xl px-6 py-3"
      >
        Claim this job
      </button>
    </form>
  );
}
