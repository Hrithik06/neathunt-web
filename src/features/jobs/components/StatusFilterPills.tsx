import { STATUS_FILTERS } from "../data/statusFilters";
import { STATUS_CFG } from "../data/statusConfig";
import { BRAND } from "@/constants/brand";
import { useTheme } from "@/context/ThemeContext";
import { Check } from "lucide-react";

type StatusFilterPillsProps = {
  filter: string;
  setFilter: (f: string) => void;
  variant?: "toolbar" | "sheet";
};
export default function StatusFilterPills({
  filter,
  setFilter,
  variant,
}: StatusFilterPillsProps) {
  const { isMidnight } = useTheme();
  const rounded = variant === "sheet" ? "rounded-2xl" : "rounded-full";

  const padding = variant === "sheet" ? "p-3" : "px-3 py-1.5";

  const text = variant === "sheet" ? "font-bold" : "text-xs font-bold";

  const layout = variant === "sheet" ? "flex justify-between items-center" : "";
  return (
    <div
      className={
        variant === "sheet" ? "flex flex-col gap-2 p-4" : "flex gap-2 flex-wrap"
      }
    >
      {STATUS_FILTERS.map((s) => {
        const cfg = STATUS_CFG[s as keyof typeof STATUS_CFG];
        const isActive = filter === s;
        return (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`${rounded} ${padding} ${text} ${layout} cursor-pointer border-0 transition-all duration-200`}
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
            {isActive && variant === "sheet" && <Check size={18} />}
          </button>
        );
      })}
    </div>
  );
}
