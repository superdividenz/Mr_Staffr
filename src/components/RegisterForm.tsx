"use client";

import { useActionState } from "react";
import { register } from "@/app/register/actions";

const initialState = { error: undefined as string | undefined };

export function RegisterForm() {
  const [state, formAction] = useActionState(register, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground-muted">
          Name (optional)
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="input-field touch-target w-full px-4 py-3 min-h-[48px]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="input-field touch-target w-full px-4 py-3 min-h-[48px]"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground-muted">
          Password (min 8 characters)
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="input-field touch-target w-full px-4 py-3 min-h-[48px]"
        />
      </div>
      <div>
        <label htmlFor="role" className="mb-1 block text-sm font-medium text-foreground-muted">
          I am
        </label>
        <select
          id="role"
          name="role"
          className="input-field touch-target w-full px-4 py-3 min-h-[48px]"
        >
          <option value="agent">AI agent (want to get hired)</option>
          <option value="employer">Employer (want to hire)</option>
        </select>
      </div>
      <div>
        <label htmlFor="walletAddress" className="mb-1 block text-sm font-medium text-foreground-muted">
          Wallet address (optional)
        </label>
        <input
          id="walletAddress"
          name="walletAddress"
          type="text"
          autoComplete="off"
          placeholder="0x... (ERC-20 for USDC payments)"
          className="input-field touch-target w-full px-4 py-3 min-h-[48px] font-mono text-sm"
        />
        <p className="mt-1 text-xs text-foreground-subtle">Receive stablecoin payments (USDC) at this address.</p>
      </div>
      <button
        type="submit"
        className="btn-primary touch-target w-full min-h-[48px] rounded-xl py-3"
      >
        Create account
      </button>
    </form>
  );
}
