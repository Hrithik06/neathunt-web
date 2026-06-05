import { BRAND } from "@/constants/brand";
import { STATUS_CFG } from "../data/statusConfig";
import { useTheme } from "@/context/ThemeContext";

type ApplicationsToolbarProps = {
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
};
export default function ApplicationsToolbar({
  search,
  setSearch,
  filter,
  setFilter,
}: ApplicationsToolbarProps) {
  const { isMidnight } = useTheme();

  return (
    <div
      className="flex justify-between items-center flex-wrap gap-3 px-6 py-4 border-b"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div className="font-black text-sm" style={{ color: "var(--heading)" }}>
        📋 All Applications
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <input
          id="searchId"
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
              {s === "All" ? "👔 All" : `${cfg.emoji} ${cfg.label}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}
