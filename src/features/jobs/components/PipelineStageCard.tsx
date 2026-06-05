import { useTheme } from "@/context/ThemeContext";
import { STATUS_CFG } from "../data/statusConfig";
import Confetti from "@/components/ui/Confetti";
type StatusConfig = (typeof STATUS_CFG)[keyof typeof STATUS_CFG];

type PipelineStageCardProps = {
  s: string;
  cfg: StatusConfig;
  counts: Record<string, number>;
  filter: string;
  setFilter: (f: string) => void;
};
export default function PipelineStageCard({
  s,
  cfg,
  counts,
  filter,
  setFilter,
}: PipelineStageCardProps) {
  const { isMidnight } = useTheme();
  return (
    <button
      key={s}
      onClick={() => setFilter(filter === s ? "All" : s)}
      className="flex-1 min-w-16 rounded-2xl py-4 px-3 text-center relative overflow-hidden cursor-pointer border-2 transition-all duration-200 bg-transparent"
      style={{
        background: isMidnight ? cfg.darkBg : cfg.bg,
        borderColor:
          filter === s
            ? isMidnight
              ? cfg.darkColor
              : cfg.color
            : "transparent",
      }}
    >
      {s === "OFFER" && (counts.OFFER || 0) > 0 && <Confetti />}
      <div className="text-xl mb-1">{cfg.emoji}</div>
      <div
        className="text-xl font-black"
        style={{ color: isMidnight ? cfg.darkColor : cfg.color }}
      >
        {counts[s] || 0}
      </div>
      <div
        className="text-xs font-bold mt-0.5"
        style={{ color: isMidnight ? cfg.darkColor : cfg.color }}
      >
        {cfg.label}
      </div>
    </button>
  );
}
