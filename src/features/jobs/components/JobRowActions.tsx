import { useResponsive } from "@/context/ResponsiveContext";
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
  const { isMobile } = useResponsive();

  return (
    <div className="jra-wrap">
      {/* ── Slot 1: URL — always occupies space, invisible if no url ── */}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="jra-btn jra-btn--url"
          onClick={(e) => e.stopPropagation()}
        >
          <span>🔗</span>

          {isMobile && <span className="jra-label">Open</span>}
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
          <span>📝</span>
          {isMobile && <span className="jra-label">Notes</span>}
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
        <span>✏️</span>
        {isMobile && <span className="jra-label">Edit</span>}
      </button>
    </div>
  );
};

export default JobRowActions;
