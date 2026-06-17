import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Currency,
  jobFormSchema,
  JobStatus,
  type Job,
  type JobStatusType,
} from "../types";
import "../styles/modal.css";

import { getTodayDate } from "../utils/dateUtils";
import { useState } from "react";
import { showToast } from "@/components/ui/showToast";
import DatePickerField from "@/components/ui/DatePickerField";
import { useCreateJob } from "../hooks/useCreateJob";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { useUpdateJob } from "../hooks/useUpdateJob";
import { PLATFORM_CFG } from "../data/platformConfig";
import PlatformField from "@/components/ui/PlatformField";

const STATUS_OPTIONS: { value: JobStatusType; label: string }[] = [
  { value: JobStatus.APPLIED, label: "📬 Applied" },
  { value: JobStatus.INTERVIEW_SCHEDULED, label: "📅 Interview Scheduled" },
  { value: JobStatus.INTERVIEW_COMPLETED, label: "🎤 Interview Completed" },
  { value: JobStatus.OFFER, label: "🎉 Offer" },
  { value: JobStatus.ACCEPTED, label: "✅ Accepted" },
  { value: JobStatus.REJECTED, label: "🌱 Rejected" },
  { value: JobStatus.WITHDRAWN, label: "↩️ Withdrawn" },
];
const CURRENCY_OPTIONS = Object.values(Currency).map((currency) => ({
  value: currency,
  label: currency,
}));
const PLATFORM_OPTIONS: {
  value: string;
  label: string;
}[] = Object.entries(PLATFORM_CFG).map(([, pfValue]) => ({
  value: pfValue.label,
  label: pfValue.label,
}));

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobFormProps {
  onClose?: () => void;
  // onDelete?: () => void; // called after successful delete so parent can refetch
  selectedJob: Job | null;
}

const JobForm = ({ onClose, selectedJob }: JobFormProps) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditMode = selectedJob !== null;

  // const { mutateAsync: createJobMutation } = useCreateJob();
  // const { mutateAsync: deleteJobMutation } = useDeleteJob();
  // const { mutateAsync: updateJobMutation } = useUpdateJob();
  const createJob = useCreateJob();
  const deleteJob = useDeleteJob();
  const updateJob = useUpdateJob();

  // ── Default values ────────────────────────────────────────────────────────
  let defaultValues: Partial<JobFormValues> = {
    status: JobStatus.APPLIED,
    appliedAt: getTodayDate(),
    // platform: PLATFORM_OPTIONS[0].value,
  };

  if (selectedJob) {
    const {
      company,
      title,
      status,
      appliedAt,
      url,
      notes,
      platform,
      salary,
      currency,
    } = selectedJob;
    defaultValues = {
      company,
      title,
      status: status as JobStatusType,
      appliedAt: appliedAt.slice(0, 10),
      platform: platform ?? PLATFORM_OPTIONS[0],
      salary: salary ?? "",
      currency: currency ?? CURRENCY_OPTIONS[0].value,
      url: url ?? "",
      notes: notes ?? "",
    };
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    control,
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });

  // ── Submit ────────────────────────────────────────────────────────────────
  const successMessage = isEditMode
    ? "Application updated"
    : "Application added";
  const submitButtonTxt = isEditMode ? "Save Changes 💾" : "Log Application 🚀";

  const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
    console.log("sd");
    try {
      setApiError(null);
      console.log(data);
      if (isEditMode) {
        const updatePayload = {
          ...data,

          notes: data.notes || null,
          url: data.url || null,

          salary: data.salary || null,
          currency: data.salary ? data.currency : null,
        };
        updateJob.mutateAsync({
          jobId: selectedJob.id,
          data: updatePayload,
        });
      } else {
        const createPayload = {
          ...data,

          notes: data.notes || undefined,
          url: data.url || undefined,

          salary: data.salary || undefined,
          currency: data.salary ? data.currency : undefined,
        };

        createJob.mutateAsync(createPayload);
      }

      onClose?.();

      showToast(successMessage, "success");
    } catch (err: any) {
      setApiError(err.message);
      console.log(createJob.error?.message);
      console.log(createJob.isError);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!selectedJob) return;
    try {
      setIsDeleting(true);
      setApiError(null);

      // await deleteJobMutation(selectedJob.id);
      await deleteJob.mutateAsync(selectedJob.id);
      onClose?.();

      showToast("Application deleted", "success");
    } catch (err: any) {
      setApiError(err.message);
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="nh-form" noValidate>
      {/* ── Row 1: Title + Company ── */}
      <div className="nh-field--row">
        <div className="nh-field">
          <label htmlFor="titleId" className="nh-label">
            Job Title <span className="nh-label__required">*</span>
          </label>
          <input
            id="titleId"
            type="text"
            placeholder="e.g. Frontend Engineer"
            className={`nh-input${errors.title ? " nh-input--error" : ""}`}
            autoComplete="organization-title"
            {...register("title")}
          />
          {errors.title && (
            <span className="nh-field__error">⚠ {errors.title.message}</span>
          )}
        </div>

        <div className="nh-field">
          <label htmlFor="companyId" className="nh-label">
            Company <span className="nh-label__required">*</span>
          </label>
          <input
            id="companyId"
            type="text"
            placeholder="e.g. Stripe"
            className={`nh-input${errors.company ? " nh-input--error" : ""}`}
            autoComplete="organization"
            {...register("company")}
          />
          {errors.company && (
            <span className="nh-field__error">⚠ {errors.company.message}</span>
          )}
        </div>
      </div>

      {/* ── Row 2: Status + Date ── */}
      <div className="nh-field--row">
        <div className="nh-field">
          <label htmlFor="statusId" className="nh-label">
            Status <span className="nh-label__required">*</span>
          </label>

          <div className="nh-select-wrap">
            <select
              id="statusId"
              className={`nh-select${errors.status ? " nh-select--error" : ""}`}
              {...register("status")}
            >
              {STATUS_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {errors.status && (
            <span className="nh-field__error">⚠ {errors.status.message}</span>
          )}
        </div>

        <div className="nh-field">
          <div className="nh-label" id="appliedAt-label">
            Date Applied <span className="nh-label__required">*</span>
          </div>
          <Controller
            name="appliedAt"
            control={control}
            render={({ field }) => (
              <DatePickerField
                value={field.value}
                onChange={field.onChange}
                labelId="appliedAt-label"
              />
            )}
          />
          {/*<input
            id="appliedAtId"
            type="date"
            className={`nh-input nh-input--date${errors.appliedAt ? " nh-input--error" : ""}`}
            {...register("appliedAt")}
          />*/}
          {errors.appliedAt && (
            <span className="nh-field__error">
              ⚠ {errors.appliedAt.message}
            </span>
          )}
        </div>
      </div>

      {/* ── Row 2: Platform + Salary + Currency ── */}

      <div className="nh-field--row-platform">
        <div className="nh-field">
          <label htmlFor="platformId" className="nh-label">
            Platform <span className="nh-label__required">*</span>
          </label>

          <Controller
            name="platform"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PlatformField
                value={field.value}
                onChange={field.onChange}
                options={PLATFORM_OPTIONS}
              />
            )}
          />
          {errors.platform && (
            <span className="nh-field__error">⚠ {errors.platform.message}</span>
          )}
        </div>

        <div className="nh-field">
          <label className="nh-label">Salary</label>

          <div className="flex gap-2">
            <div className="nh-select-wrap w-28">
              <select className="nh-select" {...register("currency")}>
                {CURRENCY_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="120-150K"
              className="nh-input flex-1"
              {...register("salary")}
            />
          </div>
          {errors.salary && (
            <span className="nh-field__error">⚠ {errors.salary.message}</span>
          )}
          {errors.currency && (
            <span className="nh-field__error">⚠ {errors.currency.message}</span>
          )}
        </div>
      </div>

      {/* ── Job URL ── */}
      <div className="nh-field">
        <label htmlFor="urlId" className="nh-label">
          Job URL
        </label>
        <input
          id="urlId"
          type="url"
          placeholder="https://..."
          className={`nh-input${errors.url ? " nh-input--error" : ""}`}
          {...register("url")}
        />
        {errors.url && (
          <span className="nh-field__error">{errors.url.message}</span>
        )}
      </div>

      {/* ── Notes ── */}
      <div className="nh-field">
        <label htmlFor="notesId" className="nh-label">
          Notes
        </label>
        <textarea
          id="notesId"
          placeholder="Recruiter name, referral, salary range…"
          className={`nh-textarea${errors.notes ? " nh-textarea--error" : ""}`}
          {...register("notes")}
        />
        {errors.notes && (
          <span className="nh-field__error">⚠ {errors.notes.message}</span>
        )}
      </div>

      <div className="nh-divider" />

      {/* ── Footer ── */}
      {confirmDelete ? (
        // ── Confirm state: replaces entire footer ──────────────────────────
        <div className="nh-modal__footer">
          <p className="nh-delete-confirm__msg">
            Delete this application? This can't be undone.
          </p>
          <div className="nh-modal__actions">
            <button
              type="button"
              className="nh-btn nh-btn--ghost"
              onClick={() => setConfirmDelete(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="nh-btn nh-btn--danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting…" : "Yes, delete it"}
            </button>
          </div>
        </div>
      ) : (
        // ── Normal footer ──────────────────────────────────────────────────
        <div className="nh-modal__footer">
          {/* Left side: delete in edit mode, hint in create mode */}
          {isEditMode ? (
            <button
              type="button"
              className="nh-btn nh-btn--delete"
              onClick={() => setConfirmDelete(true)}
            >
              🗑 Delete
            </button>
          ) : (
            <p className="nh-modal__hint">
              Fields marked{" "}
              <span style={{ color: "var(--brand-coral)" }}>*</span> are
              required
            </p>
          )}

          {/* Right side: cancel + submit */}
          <div className="nh-modal__actions">
            {onClose && (
              <button
                type="button"
                className="nh-btn nh-btn--ghost"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="nh-btn nh-btn--primary"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? "Saving…" : submitButtonTxt}
            </button>
          </div>
        </div>
      )}

      {apiError && <p className="nh-field__error">{apiError}</p>}
    </form>
  );
};

export default JobForm;
