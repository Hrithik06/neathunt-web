import Shimmer from "@/components/ui/Shimmer";

const TrophyCardSkeleton = () => {
  return (
    <div
      className="w-48 shrink-0 rounded-2xl p-3 flex flex-col justify-around"
      style={{ background: "linear-gradient(135deg,#1E2D5F,#2D3F7A)" }}
    >
      <div className="flex flex-col gap-3">
        <Shimmer className="w-2/10 h-4" />
        <Shimmer className="w-6/10 h-6" />
      </div>
      <Shimmer className="h-12" />
    </div>
  );
};

export default TrophyCardSkeleton;
