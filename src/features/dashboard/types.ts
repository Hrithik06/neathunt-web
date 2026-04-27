type Job = {
  id: number;
  company: string;
  title: string;
  status: string;
  date: string;
  platform: string;
  salary: string;
  logo: string;
};

export type { Job };

import { z } from "zod";
export enum JobStatus {
  APPLIED = "APPLIED",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  INTERVIEW_COMPLETED = "INTERVIEW_COMPLETED",
  OFFER = "OFFER",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  WITHDRAWN = "WITHDRAWN",
}
export const createJobSchema = z.object({
  company: z.string().min(1),
  title: z.string().min(1),
  status: z.enum(JobStatus).default(JobStatus.APPLIED),
  notes: z.string().optional(),
  url: z.url().optional(),
  appliedDate: z.iso.date(),
});

export const updateJobSchema = z.object({
  company: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  status: z.enum(JobStatus).optional(),
  notes: z.string().optional(),
  url: z.url().optional(),
  appliedDate: z.iso.date().optional(),
});
