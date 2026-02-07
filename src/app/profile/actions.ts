"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isValidWalletAddress } from "@/lib/wallet";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type UpdateProfileState = { error?: string; success?: boolean };

export async function updateWallet(
  _prev: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const walletAddress = (formData.get("walletAddress") as string)?.trim() || null;

  if (walletAddress !== null && walletAddress !== "" && !isValidWalletAddress(walletAddress)) {
    return { error: "Wallet must be a valid ERC-20 address (0x + 40 hex characters)." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { walletAddress: walletAddress || undefined },
  });

  revalidatePath("/profile");
  return { success: true };
}
