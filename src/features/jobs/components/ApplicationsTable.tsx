import type { Job } from "../types";
import NotesModal from "./NotesModal";
import { useState } from "react";
import ApplicationRow from "./ApplicationRow";
import ApplicationsToolbar from "./ApplicationsToolbar";
type ApplicationsTableProps = {
  filtered: Job[];
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
  handleEdit: (j: Job) => void;
};
const ApplicationsTable = ({
  filtered,
  filter,
  setFilter,
  search,
  setSearch,
  handleEdit,
}: ApplicationsTableProps) => {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false); // ← lifted here
  const [selectedNoteJob, setSelectedNoteJob] = useState<null | Job>(null);
  const onNotesClick = (job: Job) => {
    setSelectedNoteJob(job);
    setIsNotesModalOpen(true);
  };
  if (filtered.length === 0) <div>Loading....</div>;
  return (
    <div
      className="rounded-2xl border overflow-hidden fade-up-3 transition-colors duration-500"
      style={{
        background: "var(--card-bg)",
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

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: "var(--table-head-bg)" }}>
            {[
              "Company",
              "Title",
              // "Platform",
              // "Salary",
              "Date",
              "Status",
              "Actions",
            ].map((h) => (
              <th
                key={h}
                className="px-5 py-3 text-left text-xs font-black uppercase tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((job) => {
            // const platformColors = {
            //   LinkedIn: {
            //     bg: isMidnight ? "#0A1929" : "#E8F0FE",
            //     color: isMidnight ? "#60A5FA" : "#1565C0",
            //   },
            //   Naukri: {
            //     bg: isMidnight ? "#1F0A0A" : "#FEE8E8",
            //     color: isMidnight ? "#F87171" : "#C62828",
            //   },
            //   Hirist: {
            //     bg: isMidnight ? "#091F0F" : "#F0FEF8",
            //     color: isMidnight ? "#34D399" : "#1B5E20",
            //   },
            // };
            // const pc =
            //   platformColors[job.platform as keyof typeof platformColors] ??
            //   platformColors.Hirist;

            return (
              <ApplicationRow
                job={job}
                key={job.id}
                onNotesClick={onNotesClick}
                handleEdit={handleEdit}
              />
            );
          })}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} className="py-14 text-center">
                <div className="text-3xl mb-2">🔍</div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--muted)" }}
                >
                  No results — try a different search!
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedNoteJob && (
        <NotesModal
          isOpen={isNotesModalOpen}
          onClose={() => setIsNotesModalOpen(false)}
          job={selectedNoteJob}
        />
      )}
    </div>
  );
};

export default ApplicationsTable;
