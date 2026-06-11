import { STATUS_CFG } from "../data/statusConfig";
import PipelineStageCard from "./PipelineStageCard";
type JobPipelineProps = {
  counts: Record<string, number>;
  filter: string;
  setFilter: (f: string) => void;
};
const JobPipeline = ({ counts, filter, setFilter }: JobPipelineProps) => {
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
          <PipelineStageCard
            s={s}
            cfg={cfg}
            counts={counts}
            filter={filter}
            setFilter={setFilter}
            key={s}
          />
        ))}
      </div>
    </div>
  );
};

export default JobPipeline;
