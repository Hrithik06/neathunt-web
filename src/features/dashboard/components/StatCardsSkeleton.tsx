import Shimmer from "@/components/ui/Shimmer";

function CardSkeleton() {
  return (
    <div
      className={
        "relative flex-1 gap-4 min-w-32 h-32 rounded-2xl p-5 overflow-hidden border flex flex-col"
      }
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <Shimmer className="w-5 h-4 rounded-full" />
      <Shimmer className="w-2/10 h-4" />
      <Shimmer className="w-4/10 h-4" />
    </div>
  );
}
export default function StatCardsSkeleton() {
  return (
    <div className="flex gap-3 mb-6 flex-wrap fade-up-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
