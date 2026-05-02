import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createJobSchema, JobStatus } from "../types";

import useTodayDate from "../hooks/useTodayDate";

type FormFields = z.infer<typeof createJobSchema>;
const JobForm = () => {
  const todayDate = useTodayDate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      status: JobStatus.APPLIED,
      appliedDate: todayDate,
    },
  });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="titleId">Job Title</label>
      <input
        type="text"
        placeholder="Job Title"
        {...register("title")}
        id="titleId"
        minLength={1}
      />
      {errors.title && <p className="text-red-500">{errors.title?.message}</p>}

      <label htmlFor="companyId">Company</label>
      <input
        type="text"
        placeholder="Company"
        {...register("company")}
        id="companyId"
        minLength={1}
      />
      {errors.company && (
        <p className="text-red-500">{errors.company?.message}</p>
      )}

      <label htmlFor="statusId">Job Status</label>
      <select {...register("status")} id="statusId">
        <option value={JobStatus.APPLIED}>{JobStatus.APPLIED} </option>
        <option value={JobStatus.INTERVIEW_SCHEDULED}>
          {JobStatus.INTERVIEW_SCHEDULED}
        </option>
        <option value={JobStatus.INTERVIEW_COMPLETED}>
          {JobStatus.INTERVIEW_COMPLETED}
        </option>
        <option value={JobStatus.OFFER}>{JobStatus.OFFER} </option>
        <option value={JobStatus.REJECTED}>{JobStatus.REJECTED} </option>
        <option value={JobStatus.ACCEPTED}>{JobStatus.ACCEPTED} </option>
        <option value={JobStatus.WITHDRAWN}>{JobStatus.WITHDRAWN} </option>
      </select>
      {errors.status && (
        <p className="text-red-500">{errors.status?.message}</p>
      )}

      <label htmlFor="appliedDateId">Applied Date</label>
      <input
        type="date"
        placeholder="Application Date"
        {...register("appliedDate")}
        id="appliedDateId"
      />
      {errors.appliedDate && (
        <p className="text-red-500">{errors.appliedDate?.message}</p>
      )}

      <label htmlFor="notesId">Notes</label>
      <input
        type="text"
        placeholder="Notes"
        {...register("notes")}
        id="notesId"
      />
      {errors.notes && <p className="text-red-500">{errors.notes?.message}</p>}

      <label htmlFor="urlId">Job URL</label>
      <input
        type="url"
        placeholder="Job Link"
        {...register("url")}
        id="urlId"
      />
      {errors.url && <p className="text-red-500">{errors.url?.message}</p>}

      <button type="submit" className="bg-purple-500 p-4 m-4">
        Submit
      </button>
    </form>
  );
};

export default JobForm;
