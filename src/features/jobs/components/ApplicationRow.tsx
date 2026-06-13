import { useTheme } from "@/context/ThemeContext";
import { STATUS_CFG } from "../data/statusConfig";
import type { Job } from "../types";
import { convertToDateMonth } from "../utils/dateUtils";
import Badge from "./Badge";
import JobRowActions from "./JobRowActions";

type ApplicationRowProps = {
  job: Job;
  onNotesClick: (j: Job) => void;
  handleEdit: (j: Job) => void;
};
export default function ApplicationRow({
  job,
  handleEdit,
  onNotesClick,
}: ApplicationRowProps) {
  const { isMidnight } = useTheme();
  const statusColor = isMidnight
    ? STATUS_CFG[job.status as keyof typeof STATUS_CFG].darkColor
    : STATUS_CFG[job.status as keyof typeof STATUS_CFG].color;
  return (
    <tr
      key={job.id}
      className="app-row border-t cursor-pointer transition-colors duration-150"
      style={{ borderColor: "var(--card-border)" }}
    >
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
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
            className="font-black text-sm wrap-break-word"
            style={{ color: "var(--heading)" }}
          >
            {job.company}
          </span>
        </div>
      </td>
      <td
        className="px-5 py-4 text-xs font-semibold wrap-break-word"
        style={{ color: "var(--muted)" }}
      >
        {job.title}
      </td>
      {/*<td className="px-5 py-4">
      <span
        className="text-xs font-bold px-2.5 py-1 rounded-full"
        style={{ background: pc.bg, color: pc.color }}
      >
        {job.platform}
      </span>
    </td>*/}
      {/*<td
      className="px-5 py-4 text-sm font-black"
      style={{ color: "var(--heading)" }}
    >
      {job.salary}
    </td>*/}
      <td
        className="px-5 py-4 text-xs font-semibold"
        style={{ color: "var(--muted)" }}
      >
        {convertToDateMonth(job.appliedAt)}
      </td>
      <td className="px-5 py-4">
        <Badge status={job.status} isMidnight={isMidnight} />
      </td>
      {/*<td
      className="px-5 py-4 text-xs font-bold"
      style={{
        color: isMidnight
          ? STATUS_CFG[job.status as keyof typeof STATUS_CFG]
              .darkColor
          : STATUS_CFG[job.status as keyof typeof STATUS_CFG].color,
      }}
    >
      {STATUS_CFG[job.status as keyof typeof STATUS_CFG].msg}
    </td>*/}
      <td>
        <JobRowActions
          url={job.url}
          notes={job.notes}
          onNotesClick={() => onNotesClick(job)}
          onEditClick={() => handleEdit(job)}
        />
      </td>
    </tr>
  );
}
