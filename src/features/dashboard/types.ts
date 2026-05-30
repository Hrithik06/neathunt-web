import { z } from "zod";

export type Job = {
  id: number;
  company: string;
  title: string;
  status: string;
  appliedAt: string;
  platform?: string;
  salary?: string;
  logo?: string;
};

export const JobStatus = {
  APPLIED: "APPLIED",
  INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  OFFER: "OFFER",
  REJECTED: "REJECTED",
  ACCEPTED: "ACCEPTED",
  WITHDRAWN: "WITHDRAWN",
} as const;

export const createJobSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  status: z.enum(JobStatus),
  appliedAt: z.iso.date(),
  notes: z
    .string()
    .transform((v) => (v === "" ? undefined : v)) //cuz RHF sends empty string for optional values
    .optional(), //cuz RHF sends empty string for optional values
  url: z
    .union([z.literal(""), z.url()])
    .transform((v) => (v === "" ? undefined : v))
    .optional(), //cuz RHF sends empty string for optional values
});

export const updateJobSchema = z.object({
  company: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  status: z.enum(JobStatus).optional(),
  appliedAt: z.iso.date().optional(),
  notes: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .optional(), //cuz RHF sends empty string for optional values
  url: z
    .union([z.literal(""), z.url()])
    .transform((v) => (v === "" ? undefined : v))
    .optional(), //cuz RHF sends empty string for optional values
});
