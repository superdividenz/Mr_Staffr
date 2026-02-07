"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CreateJobState = { error?: string };

export async function createJob(
  _prev: CreateJobState,
  formData: FormData
): Promise<CreateJobState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/jobs/new");
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim();
  const budgetAmount = (formData.get("budgetAmount") as string)?.trim();
  const budgetCurrency = (formData.get("budgetCurrency") as string)?.trim() || "USDC";
  const acceptanceType = (formData.get("acceptanceType") as string) === "claim" ? "claim" : "apply";

  if (!title || !description) {
    return { error: "Title and description are required." };
  }
  if (!budgetAmount || isNaN(Number(budgetAmount)) || Number(budgetAmount) <= 0) {
    return { error: "Budget must be a positive number." };
  }

  await prisma.job.create({
    data: {
      title,
      description,
      budgetAmount,
      budgetCurrency: budgetCurrency || "USDC",
      acceptanceType,
      postedById: session.user.id,
    },
  });

  revalidatePath("/jobs");
  redirect("/jobs");
}

export type ApplyToJobState = { error?: string };

export async function applyToJob(
  _prev: ApplyToJobState,
  formData: FormData
): Promise<ApplyToJobState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const jobId = formData.get("jobId") as string;
  const coverMessage = (formData.get("coverMessage") as string)?.trim() || null;

  if (!jobId) return { error: "Job is required." };

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return { error: "Job not found." };
  if (job.status !== "open") return { error: "This job is no longer open." };
  if (job.postedById === session.user.id) return { error: "You cannot apply to your own job." };

  const existing = await prisma.jobApplication.findUnique({
    where: {
      jobId_applicantId: { jobId, applicantId: session.user.id },
    },
  });
  if (existing) return { error: "You have already applied to this job." };

  await prisma.jobApplication.create({
    data: {
      jobId,
      applicantId: session.user.id,
      coverMessage,
    },
  });

  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);
  return {};
}

export type ClaimJobState = { error?: string };

export async function claimJob(
  _prev: ClaimJobState,
  formData: FormData
): Promise<ClaimJobState> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const jobId = formData.get("jobId") as string;
  if (!jobId) return { error: "Job is required." };

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return { error: "Job not found." };
  if (job.status !== "open") return { error: "This job is no longer open." };
  if (job.acceptanceType !== "claim") return { error: "This job is not claimable." };
  if (job.postedById === session.user.id) return { error: "You cannot claim your own job." };

  const existing = await prisma.jobApplication.findUnique({
    where: {
      jobId_applicantId: { jobId, applicantId: session.user.id },
    },
  });
  if (existing) return { error: "You have already claimed or applied to this job." };

  // First to claim: create accepted application and mark job filled
  await prisma.$transaction([
    prisma.jobApplication.create({
      data: {
        jobId,
        applicantId: session.user.id,
        status: "accepted",
      },
    }),
    prisma.job.update({
      where: { id: jobId },
      data: { status: "filled" },
    }),
  ]);

  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);
  return {};
}
