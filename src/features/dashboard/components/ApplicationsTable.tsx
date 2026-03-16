import { useTheme } from "@/context/ThemeContext";
import { STATUS_CFG } from "../data/statusConfig";
import { BRAND } from "@/constants/brand";
import Badge from "@/components/ui/Badge";
import type { Job } from "../types";
// inside ApplicationsTable.tsx
type Props = {
  filtered: Job[];
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
};
const ApplicationsTable = ({
  filtered,
  filter,
  setFilter,
  search,
  setSearch,
}: Props) => {
  const { isMidnight } = useTheme();
  return (
    <div
      className="rounded-2xl border overflow-hidden fade-up-3 transition-colors duration-500"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      {/* Toolbar */}
      <div
        className="flex justify-between items-center flex-wrap gap-3 px-6 py-4 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <div className="font-black text-sm" style={{ color: "var(--heading)" }}>
          📋 All Applications
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search…"
            className="rounded-xl px-3 py-2 text-xs font-semibold outline-none w-40 transition-colors duration-500 border"
            style={{
              background: "var(--input-bg)",
              color: "var(--heading)",
              borderColor: "var(--card-border)",
              fontFamily: "inherit",
            }}
          />
          {["All", ...Object.keys(STATUS_CFG)].map((s) => {
            const cfg = STATUS_CFG[s as keyof typeof STATUS_CFG];
            const isActive = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="rounded-full px-3 py-1.5 text-xs font-bold cursor-pointer border-0 transition-all duration-200"
                style={{
                  fontFamily: "inherit",
                  background: isActive
                    ? s === "All"
                      ? BRAND.gold
                      : isMidnight
                        ? cfg.darkBg
                        : cfg.bg
                    : "var(--pill-inactive-bg)",
                  color: isActive
                    ? s === "All"
                      ? "#1E2D5F"
                      : isMidnight
                        ? cfg.darkColor
                        : cfg.color
                    : "var(--pill-inactive-txt)",
                }}
              >
                {s === "All" ? "👔 All" : `${cfg.emoji} ${s}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: "var(--table-head-bg)" }}>
            {[
              "Company",
              "Role",
              "Platform",
              "Salary",
              "Date",
              "Status",
              "Vibe",
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
            const platformColors = {
              LinkedIn: {
                bg: isMidnight ? "#0A1929" : "#E8F0FE",
                color: isMidnight ? "#60A5FA" : "#1565C0",
              },
              Naukri: {
                bg: isMidnight ? "#1F0A0A" : "#FEE8E8",
                color: isMidnight ? "#F87171" : "#C62828",
              },
              Hirist: {
                bg: isMidnight ? "#091F0F" : "#F0FEF8",
                color: isMidnight ? "#34D399" : "#1B5E20",
              },
            };
            const pc =
              platformColors[job.platform as keyof typeof platformColors] ??
              platformColors.Hirist;
            return (
              <tr
                key={job.id}
                className="app-row border-t cursor-pointer transition-colors duration-150"
                style={{ borderColor: "var(--card-border)" }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ background: "var(--logo-emoji-bg)" }}
                    >
                      {job.logo}
                    </span>
                    <span
                      className="font-black text-sm"
                      style={{ color: "var(--heading)" }}
                    >
                      {job.company}
                    </span>
                  </div>
                </td>
                <td
                  className="px-5 py-4 text-xs font-semibold"
                  style={{ color: "var(--muted)" }}
                >
                  {job.role}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: pc.bg, color: pc.color }}
                  >
                    {job.platform}
                  </span>
                </td>
                <td
                  className="px-5 py-4 text-sm font-black"
                  style={{ color: "var(--heading)" }}
                >
                  {job.salary}
                </td>
                <td
                  className="px-5 py-4 text-xs font-semibold"
                  style={{ color: "var(--muted)" }}
                >
                  {job.date}
                </td>
                <td className="px-5 py-4">
                  <Badge status={job.status} isMidnight={isMidnight} />
                </td>
                <td
                  className="px-5 py-4 text-xs font-bold"
                  style={{
                    color: isMidnight
                      ? STATUS_CFG[job.status as keyof typeof STATUS_CFG]
                          .darkColor
                      : STATUS_CFG[job.status as keyof typeof STATUS_CFG].color,
                  }}
                >
                  {STATUS_CFG[job.status as keyof typeof STATUS_CFG].msg}
                </td>
              </tr>
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
    </div>
  );
};

export default ApplicationsTable;
