import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createJobSchema,
  JobStatus,
  type Job,
  type JobStatusType,
} from "../../types";
import "./JobForm.css";
import { http } from "@/services/http";
import { getTodayDate } from "../../utils/getTodayDate";
import { useState } from "react";
import { showToast } from "@/components/ui/showToast";
import DatePickerField from "@/components/ui/DatePickerField";

type FormFields = z.infer<typeof createJobSchema>;

const STATUS_OPTIONS: { value: JobStatusType; label: string }[] = [
  { value: JobStatus.APPLIED, label: "📬 Applied" },
  { value: JobStatus.INTERVIEW_SCHEDULED, label: "📅 Interview Scheduled" },
  { value: JobStatus.INTERVIEW_COMPLETED, label: "🎤 Interview Completed" },
  { value: JobStatus.OFFER, label: "🎉 Offer" },
  { value: JobStatus.ACCEPTED, label: "✅ Accepted" },
  { value: JobStatus.REJECTED, label: "🌱 Rejected" },
  { value: JobStatus.WITHDRAWN, label: "↩️ Withdrawn" },
];

interface JobFormProps {
  onClose?: () => void;
  onDelete?: () => void; // called after successful delete so parent can refetch
  selectedJob: Job | null;
}

const JobForm = ({ onClose, onDelete, selectedJob }: JobFormProps) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isEditMode = selectedJob !== null;

  // ── Default values ────────────────────────────────────────────────────────
  let defaultValues: Partial<FormFields> = {
    status: JobStatus.APPLIED,
    appliedAt: getTodayDate(),
  };

  if (selectedJob) {
    const { company, title, status, appliedAt, url, notes } = selectedJob;
    defaultValues = {
      company,
      title,
      status: status as JobStatusType,
      appliedAt: appliedAt.slice(0, 10),
      url: url ?? "",
      notes: notes ?? "",
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormFields>({
    resolver: zodResolver(createJobSchema),
    defaultValues,
  });

  // ── Submit ────────────────────────────────────────────────────────────────
  const successMessage = isEditMode
    ? "Application updated"
    : "Application added";
  const submitButtonTxt = isEditMode ? "Save Changes 💾" : "Log Application 🚀";

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setApiError(null);
      await http.request({
        method: isEditMode ? "PATCH" : "POST",
        url: isEditMode ? `/jobs/${selectedJob.id}` : "/jobs",
        data,
        withCredentials: true,
      });
      onClose?.();
      setTimeout(() => showToast(successMessage, "success"), 300);
    } catch (err: any) {
      setApiError(err.message);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    if (!selectedJob) return;
    try {
      setIsDeleting(true);
      setApiError(null);
      await http.request({
        method: "DELETE",
        url: `/jobs/${selectedJob.id}`,
        withCredentials: true,
      });
      onClose?.();
      setTimeout(() => {
        showToast("Application deleted", "success");
        onDelete?.();
      }, 300);
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
          <label htmlFor="appliedAtId" className="nh-label">
            Date Applied <span className="nh-label__required">*</span>
          </label>
          <Controller
            name="appliedAt"
            control={control}
            render={({ field }) => (
              <DatePickerField value={field.value} onChange={field.onChange} />
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
              disabled={isSubmitting}
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
