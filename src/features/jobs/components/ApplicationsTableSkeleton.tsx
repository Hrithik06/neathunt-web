import Shimmer from "@/components/ui/Shimmer";

function RowSkeleton() {
  return (
    <div
      className="grid items-center gap-4 py-4 border-t"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div className="grid grid-cols-5 items-center gap-4">
        {/* Company */}
        <div className="flex items-center gap-3">
          <Shimmer className="w-9 h-9 rounded-xl" />
          <Shimmer className="w-24 h-5" />
        </div>

        {/* Title */}
        <Shimmer className="w-40 h-5" />

        {/* Date */}
        <Shimmer className="w-16 h-5" />

        {/* Status badge */}
        <Shimmer className="w-24 h-8 rounded-full" />

        {/* Actions */}
        <div className="flex gap-4 justify-start">
          <Shimmer className="w-6 h-6 rounded-full" />
          <Shimmer className="w-6 h-6 rounded-full" />
          <Shimmer className="w-6 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function ApplicationsTableSkeleton() {
  return (
    <div
      className="rounded-2xl border overflow-hidden fade-up-3"
      style={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      {/* Toolbar */}
      <div
        className="flex justify-between items-center flex-wrap gap-3 px-6 py-4 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <Shimmer className="w-40 h-5" />

        <div className="flex items-center gap-2 flex-wrap">
          <Shimmer className="w-40 h-9 rounded-xl" />
          <Shimmer className="w-16 h-8 rounded-full" />
          <Shimmer className="w-24 h-8 rounded-full" />
          <Shimmer className="w-24 h-8 rounded-full" />
        </div>
      </div>

      {/* Header */}
      <div
        className="grid grid-cols-5 gap-4 px-5 py-3 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <Shimmer className="w-20 h-4" />
        <Shimmer className="w-16 h-4" />
        <Shimmer className="w-12 h-4" />
        <Shimmer className="w-16 h-4" />
        <Shimmer className="w-16 h-4" />
      </div>

      {/* Rows */}
      <div className="px-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
