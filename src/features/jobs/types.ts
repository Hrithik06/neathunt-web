import { z } from "zod";
export const JobStatus = {
  APPLIED: "APPLIED",
  INTERVIEW_SCHEDULED: "INTERVIEW_SCHEDULED",
  INTERVIEW_COMPLETED: "INTERVIEW_COMPLETED",
  OFFER: "OFFER",
  REJECTED: "REJECTED",
  ACCEPTED: "ACCEPTED",
  WITHDRAWN: "WITHDRAWN",
} as const;
export const Currency = {
  INR: "INR",
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  CAD: "CAD",
  AUD: "AUD",
  SGD: "SGD",
  JPY: "JPY",
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
    .url("Invalid URL expected https://...")
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v))
    .optional(), //cuz RHF sends empty string for optional values
  platform: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .transform((v) => v.toUpperCase().replace(/\s+/g, "_")),
  salary: z.string().optional(),
  currency: z.enum(Currency).optional(),
});

export const updateJobSchema = z.object({
  company: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  status: z.enum(JobStatus).optional(),
  appliedAt: z.iso.date().optional(),
  notes: z
    .string()
    .nullable() //cuz when user removes previous value we want server to delete them, and HTTP doesnt send attributes with values "" or undefined
    // .transform((v) => (v === "" ? null : v)) //cuz RHF sends empty string for optional valuesand server doesnt accept empty strings, when remove the previous data we send null so server sets it to null
    .optional(),
  url: z
    .url("Invalid URL expected https://...")
    .nullable() //cuz when user removes previous value we want server to delete them, and HTTP doesnt send attributes with values "" or undefined
    .or(z.literal(""))
    // .transform((v) => (v === "" ? null : v)) //cuz RHF sends empty string for optional valuesand server doesnt accept empty strings, when remove the previous data we send null so server sets it to null
    .optional(),

  platform: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .transform((v) => v.toUpperCase().replace(/\s+/g, "_"))
    .optional(),
  salary: z.string().nullable().optional(),
  currency: z.enum(Currency).nullable().optional(),
});
export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];

export type CreateJobInput = z.infer<typeof createJobSchema>;

export type UpdateJobInput = z.infer<typeof updateJobSchema>;

export type Job = CreateJobInput & {
  id: string;
  source: string;
  updatedAt: string;
};

export const jobFormSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  status: z.enum(JobStatus),
  appliedAt: z.iso.date(),
  notes: z.string(),
  url: z.url("Invalid URL expected https://...").or(z.literal("")),
  platform: z.string().trim().min(1).max(50),
  salary: z.string(),
  currency: z.enum(Currency),
});
