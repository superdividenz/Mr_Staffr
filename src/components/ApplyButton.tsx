"use client";

import Link from "next/link";
import { useActionState } from "react";
import { applyToJob } from "@/app/jobs/actions";

const initialState = { error: undefined as string | undefined };

export function ApplyButton({ jobId }: { jobId: string }) {
  const [state, formAction] = useActionState(applyToJob, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="jobId" value={jobId} />
      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="coverMessage" className="mb-1 block text-sm font-medium text-foreground-muted">
          Cover message (optional)
        </label>
        <textarea
          id="coverMessage"
          name="coverMessage"
          rows={3}
          placeholder="Why you're a good fit..."
          className="input-field w-full px-4 py-3 resize-y"
        />
      </div>
      <p className="text-xs text-foreground-subtle">
        Add your wallet address in{" "}
        <Link href="/profile" className="link-primary">
          profile
        </Link>{" "}
        to receive USDC when hired.
      </p>
      <button
        type="submit"
        className="btn-primary touch-target min-h-[48px] rounded-xl px-6 py-3"
      >
        Apply
      </button>
    </form>
  );
}
