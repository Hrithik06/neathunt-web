import { useTheme } from "@/context/ThemeContext";
import type { Job } from "../types";
import { convertToDateMonth } from "../utils/dateUtils";
import Badge from "./Badge";
import { STATUS_CFG } from "../data/statusConfig";
import ApplicationsToolbar from "./ApplicationsToolbar";
import JobRowActions from "./JobRowActions";
import { useState } from "react";
import NotesModal from "./NotesModal";
const withOpacity = (hex: string, opacity: string) => `${hex}${opacity}`;
type MobileApplicationsGridProps = {
  filtered: Job[];
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
  handleEdit: (j: Job) => void;
};

type ApplicationCardProps = {
  job: Job;
  onNotesClick: () => void;
  onEditClick: () => void;
  selectedId: string | null;
  setSelectedId: (jobId: string) => void;
};

export function MobileApplicationCard({
  job,
  onNotesClick,
  onEditClick,
  selectedId,
  setSelectedId,
}: ApplicationCardProps) {
  const { isMidnight } = useTheme();
  const expanded = selectedId === job.id;
  const statusColor = isMidnight
    ? STATUS_CFG[job.status as keyof typeof STATUS_CFG].darkColor
    : STATUS_CFG[job.status as keyof typeof STATUS_CFG].color;
  return (
    <div
      className="border rounded-xl p-4 flex flex-col gap-3 min-w-0 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => setSelectedId(job.id)}
      style={{
        borderColor: "var(--card-border)",
        // background: "linear-gradient(135deg,#1E2D5F,#2D3F7A)",

        // backgroundColor: "var(--card-bg)",
      }}
    >
      <div className="flex gap-4 items-center">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 font-extrabold"
          style={{
            background: "var(--logo-emoji-bg)",
            color: statusColor,
          }}
        >
          {job.company[0].toUpperCase()}
        </span>
        <span
          className="font-black text-sm wrap-break-word text-white"
          // style={{ color: "var(--heading)" }}
        >
          {job.company}
        </span>
      </div>
      <div
        className="text-sm font-semibold wrap-break-word"
        style={{ color: "var(--heading)", opacity: 0.8 }}
      >
        {job.title}
      </div>

      <div className="flex items-center gap-3">
        <Badge status={job.status} isMidnight={isMidnight} />

        <span className="text-sm text-white ">
          📅 {convertToDateMonth(job.appliedAt)}
        </span>
      </div>

      <div className="mt-auto ">
        {expanded ? (
          <JobRowActions
            url={job.url}
            notes={job.notes}
            onNotesClick={onNotesClick}
            onEditClick={onEditClick}
          />
        ) : (
          <span className="text-white flex justify-center">...</span>
        )}
      </div>
    </div>
  );
}
export default function MobileApplicationsGrid({
  filtered,
  filter,
  setFilter,
  search,
  setSearch,
  handleEdit,
}: MobileApplicationsGridProps) {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedNoteJob, setSelectedNoteJob] = useState<null | Job>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onNotesClick = (job: Job) => {
    setSelectedNoteJob(job);
    setIsNotesModalOpen(true);
  };
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
            onNotesClick={() => onNotesClick(j)}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
      {selectedNoteJob && (
        <NotesModal
          isOpen={isNotesModalOpen}
          onClose={() => setIsNotesModalOpen(false)}
          job={selectedNoteJob}
        />
      )}
    </div>
  );
}
