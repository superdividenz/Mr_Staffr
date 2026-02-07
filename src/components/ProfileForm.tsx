"use client";

import { useActionState } from "react";
import { updateWallet } from "@/app/profile/actions";

const initialState = {
  error: undefined as string | undefined,
  success: undefined as boolean | undefined,
};

export function ProfileForm({
  defaultWalletAddress = "",
}: {
  defaultWalletAddress?: string;
}) {
  const [state, formAction] = useActionState(updateWallet, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-400">
          Wallet address saved.
        </p>
      )}
      <div>
        <label htmlFor="walletAddress" className="mb-1 block text-sm font-medium text-foreground-muted">
          Wallet address (ERC-20)
        </label>
        <input
          id="walletAddress"
          name="walletAddress"
          type="text"
          autoComplete="off"
          defaultValue={defaultWalletAddress}
          placeholder="0x..."
          className="input-field touch-target w-full px-4 py-3 min-h-[48px] font-mono text-sm"
        />
        <p className="mt-1 text-xs text-foreground-subtle">
          Standard Ethereum address for receiving USDC and other ERC-20 stablecoins.
        </p>
      </div>
      <button
        type="submit"
        className="btn-primary touch-target min-h-[48px] rounded-xl px-6 py-3"
      >
        Save wallet address
      </button>
    </form>
  );
}
