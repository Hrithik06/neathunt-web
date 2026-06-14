import { useTheme } from "@/context/ThemeContext";
import { useResponsive } from "@/context/ResponsiveContext";
import { useState } from "react";
import StatusFilterPills from "./StatusFilterPills";
import FilterSheetModal from "./FilterSheetModal";
import { ListFilter } from "lucide-react";

type ApplicationsToolbarProps = {
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
};
export default function ApplicationsToolbar({
  filter,
  setFilter,
  search,
  setSearch,
}: ApplicationsToolbarProps) {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const { isMobile } = useResponsive();
  return (
    <div
      className="flex flex-col sm:flex-row justify-between sm:items-center flex-wrap gap-3 px-6 py-4 border-b"
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
          className="flex-1 rounded-xl px-3 py-2 text-xs font-semibold outline-none w-40 transition-colors duration-500 border"
          style={{
            background: "var(--input-bg)",
            color: "var(--heading)",
            borderColor: "var(--card-border)",
            fontFamily: "inherit",
          }}
        />

        {isMobile ? (
          <button
            onClick={() => setIsFilterSheetOpen(true)}
            style={{ color: "var(--heading)" }}
          >
            <ListFilter size={20} color="var(--heading)" />
          </button>
        ) : (
          <StatusFilterPills filter={filter} setFilter={setFilter} />
        )}
      </div>
      <FilterSheetModal
        isOpen={isFilterSheetOpen}
        filter={filter}
        setFilter={setFilter}
        onClose={() => setIsFilterSheetOpen(false)}
      />
    </div>
  );
}
