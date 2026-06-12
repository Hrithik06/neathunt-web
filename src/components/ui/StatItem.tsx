import { BRAND } from "@/constants/brand";
import { useCountUp } from "@/features/landing/hooks/useCountUp";
type StatItemProps = {
  value: string;
  label: string;
  inView: boolean;
};
const StatItem = ({ value, label, inView }: StatItemProps) => {
  const displayed = useCountUp(value, 1400, inView);
  return (
    <div className="text-center px-6">
      <div
        className="text-4xl font-black tracking-tight"
        style={{ color: BRAND.gold }}
      >
        {inView ? displayed : "0"}
      </div>
      <div
        className="text-sm font-semibold mt-1 max-w-32 mx-auto leading-snug"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </div>
    </div>
  );
};
export default StatItem;
