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

export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];

/**
 * Required text input.
 *
 * RHF stores strings.
 *
 * Prevents:
 *
 * ""
 * "     "
 */

const nonEmptyString = (field: string) =>
  z
    .string({
      error: `${field} is required`,
    })
    .trim()
    .min(1, `${field} is required`);
export const jobFormSchema = z.object({
  company: nonEmptyString("Company").max(
    100,
    "Company must be at most 100 characters",
  ),

  title: nonEmptyString("Title").max(
    150,
    "Title must be at most 150 characters",
  ),

  status: z.enum(JobStatus),

  appliedAt: z.iso.date(),

  /**
   * Optional textarea.
   *
   * RHF stores:
   *
   * ""
   *
   * when empty.
   */
  notes: z.string().trim().max(1000, "Notes must be at most 1000 characters"),

  /**
   * URL input.
   *
   * Empty string is allowed because RHF
   * always stores strings.
   */
  url: z
    .url("Invalid URL expected https://...")
    .max(500, "URL must be at most 500 characters")
    .or(z.literal("")),

  /**
   * User sees:
   *
   * LinkedIn
   * Pyjama Jobs
   *
   * Actual normalization happens
   * before API call.
   */
  platform: nonEmptyString("Platform").max(
    50,
    "Platform must be at most 50 characters",
  ),

  /**
   * RHF stores:
   *
   * ""
   *
   * when empty.
   */
  salary: z.string().trim().max(50, "Salary must be at most 50 characters"),

  currency: z.enum(Currency),
});

export type JobFormValues = z.infer<typeof jobFormSchema>;

/**
 * API payload for:
 *
 * POST /jobs
 *
 * undefined means:
 *
 * user did not provide value.
 *
 * DB stores NULL for nullable columns.
 */
export type CreateJobInput = {
  company: string;

  title: string;

  status?: JobStatusType;

  appliedAt: string;

  notes?: string;

  url?: string;

  platform: string;

  salary?: string;

  currency?: keyof typeof Currency;
};

/**
 * API payload for:
 *
 * PATCH /jobs/:id
 *
 * undefined
 * -> don't update field
 *
 * null
 * -> explicitly remove value
 *
 * string
 * -> update
 */
export type UpdateJobInput = {
  company?: string;

  title?: string;

  status?: JobStatusType;

  appliedAt?: string;

  notes?: string | null;

  url?: string | null;

  platform?: string;

  salary?: string | null;

  currency?: keyof typeof Currency | null;
};

export type Job = {
  id: string;

  company: string;

  title: string;

  status: JobStatusType;

  appliedAt: string;

  notes: string | null;

  url: string | null;

  platform: string;

  salary: string | null;

  currency: keyof typeof Currency | null;

  source: string;

  updatedAt: string;
};
