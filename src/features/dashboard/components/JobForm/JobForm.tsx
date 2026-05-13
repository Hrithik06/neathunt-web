import { useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJobSchema, JobStatus } from "../../types";
import "./JobForm.css";
import { http } from "@/services/http";
import { getTodayDate } from "../../utils/getTodayDate";

type FormFields = z.infer<typeof createJobSchema>;
type JobStatusType = (typeof JobStatus)[keyof typeof JobStatus];
const STATUS_OPTIONS: {
  value: JobStatusType;
  label: string;
}[] = [
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
}

const JobForm = ({ onClose }: JobFormProps) => {
  const todayDate = getTodayDate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      status: JobStatus.APPLIED,
      appliedDate: todayDate,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await http
      .request({
        method: "POST",
        url: "/jobs",
        data,
        withCredentials: true,
      })
      .then(() => onClose && onClose());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="nh-form" noValidate>
      {/* ── Row 1: Title + Company ─────────────────────────────────── */}
      <div className="nh-field--row">
        <div className="nh-field">
          <label htmlFor="titleId" className="nh-label">
            Job Title
            <span className="nh-label__required">*</span>
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
            Company
            <span className="nh-label__required">*</span>
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

      {/* ── Row 2: Status + Date ───────────────────────────────────── */}
      <div className="nh-field--row">
        <div className="nh-field">
          <label htmlFor="statusId" className="nh-label">
            Status
            <span className="nh-label__required">*</span>
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
          <label htmlFor="appliedDateId" className="nh-label">
            Date Applied
            <span className="nh-label__required">*</span>
          </label>
          <input
            id="appliedDateId"
            type="date"
            className={`nh-input nh-input--date${errors.appliedDate ? " nh-input--error" : ""}`}
            {...register("appliedDate")}
          />
          {errors.appliedDate && (
            <span className="nh-field__error">
              ⚠ {errors.appliedDate.message}
            </span>
          )}
        </div>
      </div>

      {/* ── Job URL ───────────────────────────────────────────────── */}
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
          <span className="nh-field__error">⚠ {errors.url.message}</span>
        )}
      </div>

      {/* ── Notes ─────────────────────────────────────────────────── */}
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

      {/* ── Divider ───────────────────────────────────────────────── */}
      <div className="nh-divider" />

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="nh-modal__footer">
        <p className="nh-modal__hint">
          Fields marked <span style={{ color: "var(--brand-coral)" }}>*</span>{" "}
          are required
        </p>
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
            {isSubmitting ? "Saving…" : "Log Application 🚀"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobForm;
