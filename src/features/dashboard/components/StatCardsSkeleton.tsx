function CardSkeleton() {
  return (
    <div
      className={`relative flex flex-col gap-4 min-w-32 h-32 rounded-2xl p-5 overflow-hidden border`}
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="w-1/10 h-4 bg-red-600"></div>
      <div className="w-1/10 h-4 bg-red-600"></div>
      <div className="w-1/10 h-4 bg-red-600"></div>
    </div>
  );
}
export default function StatCardsSkeleton() {
  return (
    <div className="flex gap-3 mb-6 flex-wrap fade-up-1">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
