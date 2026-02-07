/**
 * ERC-20 compatible Ethereum address (0x + 40 hex chars).
 * Used for receiving stablecoins (USDC, etc.).
 */
const ERC20_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export function isValidWalletAddress(value: string | null | undefined): boolean {
  if (!value || typeof value !== "string") return false;
  return ERC20_ADDRESS_REGEX.test(value.trim());
}

export function formatWalletAddress(value: string): string {
  const trimmed = value.trim();
  if (!isValidWalletAddress(trimmed)) return value;
  return `${trimmed.slice(0, 6)}…${trimmed.slice(-4)}`;
}
