import { z } from "zod";

export type Job = {
  id: number;
  company: string;
  title: string;
  status: string;
  date: string;
  platform: string;
  salary: string;
  logo: string;
};

// export enum JobStatus {
//   APPLIED = "APPLIED",
//   INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
//   INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED",
//   OFFER = "OFFER",
//   REJECTED = "REJECTED",
//   ACCEPTED = "ACCEPTED",
//   WITHDRAWN = "WITHDRAWN",
// }

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
  appliedDate: z.iso.date(),
  notes: z
    .union([z.literal(""), z.url()])
    .transform((v) => (v === "" ? undefined : v))
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
  appliedDate: z.iso.date().optional(),
  notes: z
    .union([z.literal(""), z.url()])
    .transform((v) => (v === "" ? undefined : v))
    .optional(), //cuz RHF sends empty string for optional values
  url: z
    .union([z.literal(""), z.url()])
    .transform((v) => (v === "" ? undefined : v))
    .optional(), //cuz RHF sends empty string for optional values
});
