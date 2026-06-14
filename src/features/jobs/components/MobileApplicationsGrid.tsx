import type { Job } from "../types";
import ApplicationsToolbar from "./ApplicationsToolbar";
import { useState, lazy } from "react";
import { MobileApplicationCard } from "./MobileApplicationCard";
const NotesModal = lazy(() => import("./NotesModal"));
type MobileApplicationsGridProps = {
  filtered: Job[];
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
  handleEdit: (j: Job) => void;
};

export default function MobileApplicationsGrid({
  filtered,
  filter,
  setFilter,
  search,
  setSearch,
  handleEdit,
}: MobileApplicationsGridProps) {
  const [notesJob, setNotesJob] = useState<Job | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (filtered.length === 0) <div>Loading....</div>;

  return (
    <div
      className="rounded-2xl border overflow-auto fade-up-3 transition-colors duration-500"
      style={{
        background: "var(--card-bg)" + "",
        borderColor: "var(--card-border)",
      }}
    >
      {/* Toolbar */}
      <ApplicationsToolbar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
      />

      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((j) => (
          <MobileApplicationCard
            job={j}
            key={j.id}
            onEditClick={() => handleEdit(j)}
            onNotesClick={() => setNotesJob(j)}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>

      {notesJob && (
        <NotesModal
          isOpen={!!notesJob}
          onClose={() => setNotesJob(null)}
          job={notesJob}
        />
      )}
    </div>
  );
}
