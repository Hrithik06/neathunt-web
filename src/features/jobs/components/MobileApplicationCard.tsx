import { useTheme } from "@/context/ThemeContext";
import { convertToDateMonth } from "../utils/dateUtils";
import Badge from "./Badge";
import { STATUS_CFG } from "../data/statusConfig";
import JobRowActions from "./JobRowActions";
import type { Job } from "../types";

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
        background: isMidnight ? "#182235" : "#FFFDF8",

        boxShadow: isMidnight
          ? "0 6px 20px rgba(0,0,0,.25)"
          : "0 4px 12px rgba(30,45,95,.05)",
        border: isMidnight ? "1px solid #26314A" : "1px solid #F1E4CA",
      }}
    >
      <div className="flex gap-4 items-center">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 font-extrabold"
          style={{
            background: "var(--logo-emoji-bg)",
            color: statusColor,
            // background: "linear-gradient(135deg, #FFF7E7, #F4EFE4)",
          }}
        >
          {job.company[0].toUpperCase()}
        </span>
        <span
          className="font-black text-sm wrap-break-word"
          style={{ color: "var(--heading)" }}
        >
          {job.company}
        </span>
      </div>
      <div
        className="text-sm font-semibold wrap-break-word"
        style={{ color: "var(--muted)", opacity: 0.8 }}
      >
        {job.title}
      </div>

      <div className="flex items-center gap-3">
        <Badge status={job.status} isMidnight={isMidnight} />

        <span className="text-sm " style={{ color: "var(--heading)" }}>
          📅 {convertToDateMonth(job.appliedAt)}
        </span>
      </div>

      <div className="mt-auto">
        {expanded ? (
          <JobRowActions
            url={job.url}
            notes={job.notes}
            onNotesClick={onNotesClick}
            onEditClick={onEditClick}
          />
        ) : (
          <span
            className="flex justify-center "
            style={{ color: "var(--heading)" }}
          >
            ...
          </span>
        )}
      </div>
    </div>
  );
}
