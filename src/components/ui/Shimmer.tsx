type ShimmerProps = {
  className?: string;
};

export default function Shimmer({ className = "" }: ShimmerProps) {
  return (
    <div className={`animate-pulse rounded bg-gray-600/60 ${className}`} />
  );
}
