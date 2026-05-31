import { useEffect } from "react";
import type { Job } from "../types";
import "./modal.css";
import { STATUS_CFG } from "../data/statusConfig";
import { formatAppliedDate } from "../utils/dateUtils";
type NotesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
};

const NotesModal = ({ isOpen, onClose, job }: NotesModalProps) => {
  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="nh-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notes-modal-title"
    >
      {/* Stop clicks inside the panel from closing the modal */}
      <div className="nh-modal" onClick={(e) => e.stopPropagation()}>
        <div className="nh-modal__header">
          <div>
            <p className="nh-modal__eyebrow">📝 Notes</p>

            <p className="nh-notes__job" id="notes-modal-title">
              {job.company} · {job.title}
            </p>

            <p className="nh-notes__meta">
              {formatAppliedDate(job.appliedAt)} •{" "}
              {STATUS_CFG[job.status].label}
            </p>
          </div>

          <button
            className="nh-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="nh-divider" />

        <div className="nh-notes">{job.notes}</div>
      </div>
    </div>
  );
};

export default NotesModal;
