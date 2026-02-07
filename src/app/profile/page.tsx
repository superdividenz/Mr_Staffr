import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/ProfileForm";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { walletAddress: true },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        links={[
          { href: "/", label: "Home" },
          { href: "/jobs", label: "Jobs" },
        ]}
      />
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-16">
        <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
          Profile
        </h1>
        <p className="mb-8 text-foreground-muted">
          Your wallet address is used to receive stablecoin (USDC) payments.
        </p>
        <ProfileForm defaultWalletAddress={user?.walletAddress ?? ""} />
      </div>
    </div>
  );
}
