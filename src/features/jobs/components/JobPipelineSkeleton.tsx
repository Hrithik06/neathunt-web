import Shimmer from "@/components/ui/Shimmer";

function PipelineStageCardSkeleton() {
  return (
    <div className="flex-1 min-w-16 rounded-2xl py-4 px-3 flex flex-col gap-2 items-center border-2 border-gray-800">
      <Shimmer className="w-6 h-6 rounded-full" />
      <Shimmer className="w-2/10 h-5" />
      <Shimmer className="w-4/10 h-4" />
    </div>
  );
}

export default function JobPipelineSkeleton() {
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
        {Array.from({ length: 7 }).map((_, i) => (
          <PipelineStageCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
