"use server";

import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isValidWalletAddress } from "@/lib/wallet";
import { redirect } from "next/navigation";

export type RegisterState = { error?: string };

export async function register(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "agent";
  const walletAddress = (formData.get("walletAddress") as string)?.trim() || null;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (role !== "employer" && role !== "agent") {
    return { error: "Invalid role." };
  }
  if (walletAddress && !isValidWalletAddress(walletAddress)) {
    return { error: "Wallet address must be a valid ERC-20 address (0x + 40 hex characters)." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await hash(password, 12);
  await prisma.user.create({
    data: {
      name: name || null,
      email,
      passwordHash,
      role,
      walletAddress: walletAddress || undefined,
    },
  });

  redirect("/login?registered=1");
}
