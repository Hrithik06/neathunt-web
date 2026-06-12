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
// export type Job = {
//   id: number;
//   company: string;
//   title: string;
//   status: typeof JobStatus;
//   appliedAt: string;
//   notes?: string;
//   url?: string;
//   // platform?: string;
//   // salary?: string;
//   // logo?: string;
// };

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
export type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];

export type CreateJobInput = z.infer<typeof createJobSchema>;

export type UpdateJobInput = z.infer<typeof updateJobSchema>;

export type Job = CreateJobInput & {
  id: string;
  source: string;
  updatedAt: string;
};
