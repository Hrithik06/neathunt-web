import { useTheme } from "@/context/ThemeContext";
import { STATUS_CFG } from "../data/statusConfig";
import type { Job } from "../types";
import { convertToDateMonth } from "../utils/dateUtils";
import Badge from "./Badge";
import JobRowActions from "./JobRowActions";
import { getPlatformBadge } from "../utils/getPlatformBadge";

type ApplicationRowProps = {
  job: Job;
  onEditClick: () => void;
  onNotesClick: () => void;
  isSalaryVisible: boolean;
};

export default function ApplicationRow({
  job,
  onEditClick,
  onNotesClick,
  isSalaryVisible,
}: ApplicationRowProps) {
  const { isMidnight } = useTheme();
  const statusCfg = STATUS_CFG[job.status as keyof typeof STATUS_CFG];
  const statusColor = isMidnight ? statusCfg.darkColor : statusCfg.color;

  const platformCfg = getPlatformBadge(job.platform);

  return (
    <>
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
          style={{ color: "var(--heading)", opacity: 0.6 }}
        >
          {job.title}
        </td>
        <td className="px-5 py-4">
          <Badge badgeCfg={platformCfg} />
        </td>
        {isSalaryVisible && (
          <td className="px-5 py-4 text-xs" style={{ color: "var(--muted)" }}>
            {job.currency ?? ""} {job.salary}
          </td>
        )}
        <td
          className="px-5 py-4 text-xs font-semibold"
          style={{ color: "var(--muted)" }}
        >
          {convertToDateMonth(job.appliedAt)}
        </td>
        <td className="px-5 py-4">
          <Badge badgeCfg={statusCfg} />
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
            onNotesClick={onNotesClick}
            onEditClick={onEditClick}
          />
        </td>
      </tr>
    </>
  );
}
