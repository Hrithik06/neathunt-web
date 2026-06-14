import { X } from "lucide-react";

type FilterSheetProps = {
  filter: string;
  setFilter: (f: string) => void;
};
export default function FilterSheet({ filter, setFilter }: FilterSheetProps) {
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
              Filter
            </p>

            <p className="nh-notes__meta">test</p>
          </div>

          <button
            className="nh-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X />
          </button>
        </div>

        <div className="nh-divider" />

        <div className="nh-notes">{job.notes}</div>
      </div>
    </div>
  );
}
