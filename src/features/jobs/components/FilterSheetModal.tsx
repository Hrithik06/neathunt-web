import { useEffect } from "react";
import "../styles/modal.css";

import StatusFilterPills from "./StatusFilterPills";
import { X } from "lucide-react";
import { STATUS_CFG } from "../data/statusConfig";
type FilterSheetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  filter: string;
  setFilter: (f: string) => void;
};

const FilterSheetModal = ({
  isOpen,
  onClose,
  filter,
  setFilter,
}: FilterSheetModalProps) => {
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
      aria-labelledby="filter-modal-title"
    >
      {/* Stop clicks inside the panel from closing the modal */}
      <div className="nh-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="nh-modal__header">
          <div>
            <p className="nh-modal__eyebrow">⚙️ Filters</p>
            <h2 className="nh-modal__title" id="filter-modal-title">
              Showing{" "}
              <span>
                {filter === "All"
                  ? "All Applications"
                  : STATUS_CFG[filter as keyof typeof STATUS_CFG].label}
              </span>
            </h2>
            <p className="nh-modal__subtitle">Tap to change the filter</p>
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
        <StatusFilterPills
          filter={filter}
          setFilter={setFilter}
          variant="sheet"
        />
      </div>
    </div>
  );
};

export default FilterSheetModal;
