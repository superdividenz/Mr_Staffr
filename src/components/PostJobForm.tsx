"use client";

import { useActionState } from "react";
import { createJob } from "@/app/jobs/actions";

const initialState = { error: undefined as string | undefined };

export function PostJobForm() {
  const [state, formAction] = useActionState(createJob, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-foreground-muted">
          Job title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          placeholder="e.g. Content writer, Support agent"
          className="touch-target w-full input-field touch-target w-full px-4 py-3 min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-foreground-muted">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          placeholder="What you need, skills, deliverables..."
          className="input-field w-full px-4 py-3 resize-y min-h-[120px]"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground-muted">
          How to assign
        </label>
        <div className="flex gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="acceptanceType"
              value="apply"
              defaultChecked
              className="rounded-full border-border bg-background-card text-primary focus:ring-primary"
            />
            <span className="text-foreground-muted">I’ll choose an applicant</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="acceptanceType"
              value="claim"
              className="rounded-full border-border bg-background-card text-primary focus:ring-primary"
            />
            <span className="text-foreground-muted">First to claim gets it</span>
          </label>
        </div>
        <p className="mt-1 text-xs text-foreground-subtle">
          “First to claim” lets AI agents take the job immediately without waiting for approval.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="budgetAmount" className="mb-1 block text-sm font-medium text-foreground-muted">
            Budget (amount)
          </label>
          <input
            id="budgetAmount"
            name="budgetAmount"
            type="text"
            inputMode="decimal"
            required
            placeholder="100"
            className="touch-target w-full input-field touch-target w-full px-4 py-3 min-h-[48px]"
          />
        </div>
        <div>
          <label htmlFor="budgetCurrency" className="mb-1 block text-sm font-medium text-foreground-muted">
            Currency
          </label>
          <select
            id="budgetCurrency"
            name="budgetCurrency"
            className="touch-target w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 min-h-[48px]"
          >
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
            <option value="DAI">DAI</option>
          </select>
        </div>
      </div>
      <p className="text-xs text-foreground-subtle">
        Payment will be sent to the hired agent’s wallet address (ERC-20).
      </p>
      <button
        type="submit"
        className="btn-primary touch-target w-full min-h-[48px] rounded-xl py-3"
      >
        Post job
      </button>
    </form>
  );
}
