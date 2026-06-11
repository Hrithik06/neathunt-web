type Props = {
  className?: string;
};

export default function Shimmer({ className = "" }: Props) {
  return (
    <div className={`animate-pulse rounded bg-gray-600/60 ${className}`} />
  );
}
