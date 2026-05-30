import Confetti from "@/components/ui/Confetti";
import { STATUS_CFG } from "../data/statusConfig";
import { useTheme } from "@/context/ThemeContext";
type Props = {
  counts: Record<string, number>;
  filter: string;
  setFilter: (f: string) => void;
};
const JobPipeline = ({ counts, filter, setFilter }: Props) => {
  const { isMidnight } = useTheme();
  //   const [filter, setFilter] = useState("All");

  return (
    <div
      className="flex-1 min-w-72 rounded-2xl p-6 border transition-colors duration-500"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="font-black text-sm mb-4"
        style={{ color: "var(--heading)" }}
      >
        🗺️ Your Journey
      </div>
      <div className="flex gap-2 flex-wrap">
        {Object.entries(STATUS_CFG).map(([s, cfg]) => (
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
            {s === "Offer" && (counts.Offer || 0) > 0 && <Confetti />}
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
        ))}
      </div>
    </div>
  );
};

export default JobPipeline;
