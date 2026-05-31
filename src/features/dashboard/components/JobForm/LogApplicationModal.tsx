import { useEffect } from "react";
import JobForm from "./JobForm";
import "./JobForm.css";
import type { Job } from "../../types";

interface LogApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: Job | null;
}

const LogApplicationModal = ({
  isOpen,
  onClose,
  selectedJob,
}: LogApplicationModalProps) => {
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
      aria-labelledby="log-app-modal-title"
    >
      {/* Stop clicks inside the panel from closing the modal */}
      <div className="nh-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="nh-modal__header">
          <div>
            <p className="nh-modal__eyebrow">✦ NeatHunt</p>
            <h2 className="nh-modal__title" id="log-app-modal-title">
              Log <span>Application</span>
            </h2>
            <p className="nh-modal__subtitle">
              Track a new job you've applied to
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

        {/* Form */}
        <JobForm
          onClose={onClose}
          selectedJob={selectedJob}
          onDelete={() => {
            console.log("Job Deleted");
          }}
        />
      </div>
    </div>
  );
};

export default LogApplicationModal;
