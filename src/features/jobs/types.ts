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

// const nonEmptyString = z.string().trim().min(1);

// const optionalString = z
//   .string()
//   .trim()
//   .transform((v) => v || undefined)
//   .optional();
// const nullableString = z.string().trim().nullable().optional();
// export const createJobSchema = z.object({
//   company: nonEmptyString,
//   title: nonEmptyString,
//   status: z.enum(JobStatus),
//   appliedAt: z.iso.date(),
//   notes: z
//     .string()
//     .trim()
//     .transform((v) => (v === "" ? undefined : v)) //cuz RHF sends empty string for optional values
//     .optional(), //cuz RHF sends empty string for optional values
//   url: z
//     .url("Invalid URL expected https://...")
//     .or(z.literal(""))
//     .transform((v) => (v === "" ? undefined : v))
//     .optional(), //cuz RHF sends empty string for optional values
//   platform: nonEmptyString
//     .max(50)
//     .transform((v) => v.toUpperCase().replace(/\s+/g, "_")),
//   salary: z.string().trim().optional(),
//   currency: z.enum(Currency).optional(),
// });

// export const updateJobSchema = z.object({
//   company: nonEmptyString.optional(),
//   title: nonEmptyString.optional(),
//   status: z.enum(JobStatus).optional(),
//   appliedAt: z.iso.date().optional(),
//   notes: z
//     .string()
//     .trim()
//     .nullable() //cuz when user removes previous value we want server to delete them, and HTTP doesnt send attributes with values undefined
//     // .transform((v) => (v === "" ? null : v)) //cuz RHF sends empty string for optional valuesand server doesnt accept empty strings, when remove the previous data we send null so server sets it to null
//     .optional(),
//   url: z
//     .url("Invalid URL expected https://...")
//     .nullable() //cuz when user removes previous value we want server to delete them, and HTTP doesnt send attributes with values undefined
//     .or(z.literal(""))
//     // .transform((v) => (v === "" ? null : v)) //cuz RHF sends empty string for optional valuesand server doesnt accept empty strings, when remove the previous data we send null so server sets it to null
//     .optional(),

//   platform: nonEmptyString
//     .max(50)
//     .transform((v) => v.toUpperCase().replace(/\s+/g, "_"))
//     .optional(),
//   salary: z.string().trim().nullable().optional(),
//   currency: z.enum(Currency).nullable().optional(),
// });
export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];

// export type CreateJobInput = z.infer<typeof createJobSchema>;

// export type UpdateJobInput = z.infer<typeof updateJobSchema>;

// export type Job = CreateJobInput & {
//   id: string;
//   source: string;
//   updatedAt: string;
// };

// export const jobFormSchema = z.object({
//   company: nonEmptyString,
//   title: nonEmptyString,
//   status: z.enum(JobStatus),
//   appliedAt: z.iso.date(),
//   notes: z.string().trim(),
//   url: z.url("Invalid URL expected https://...").or(z.literal("")),
//   platform: z.string("Select or enter platforn").trim().min(1).max(50),
//   salary: z.string().trim(),
//   currency: z.enum(Currency),
// });

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
const nonEmptyString = z.string().trim().min(1);

export const jobFormSchema = z.object({
  company: nonEmptyString,

  title: nonEmptyString,

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
  notes: z.string().trim(),

  /**
   * URL input.
   *
   * Empty string is allowed because RHF
   * always stores strings.
   */
  url: z.url("Invalid URL expected https://...").or(z.literal("")),

  /**
   * User sees:
   *
   * Pyjama Jobs
   *
   * Actual normalization happens
   * before API call.
   */
  platform: nonEmptyString.max(50),

  /**
   * RHF stores:
   *
   * ""
   *
   * when empty.
   */
  salary: z.string().trim(),

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
