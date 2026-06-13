import { useIsMobile } from "@/features/dashboard/hooks/useIsMobile";
import "./JobRowActions.css";

interface JobRowActionsProps {
  url?: string | null;
  notes?: string | null;
  onNotesClick: () => void;
  onEditClick: () => void;
}

const JobRowActions = ({
  url,
  notes,
  onNotesClick,
  onEditClick,
}: JobRowActionsProps) => {
  return (
    <div className="jra-wrap">
      {/* ── Slot 1: URL — always occupies space, invisible if no url ── */}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="jra-btn jra-btn--url"
          title="Open job posting"
          onClick={(e) => e.stopPropagation()}
        >
          🔗
        </a>
      ) : (
        <span className="jra-slot" aria-hidden="true" />
      )}

      {/* ── Slot 2: Notes — always occupies space, invisible if no notes ── */}
      {notes ? (
        <button
          type="button"
          className="jra-btn jra-btn--notes"
          title="View notes"
          onClick={(e) => {
            e.stopPropagation();
            onNotesClick();
          }}
        >
          📝
        </button>
      ) : (
        <span className="jra-slot" aria-hidden="true" />
      )}

      {/* ── Slot 3: Edit — always rendered ── */}
      <button
        type="button"
        className="jra-btn jra-btn--edit"
        title="Edit application"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick();
        }}
      >
        ✏️
      </button>
    </div>
  );
};

export default JobRowActions;
