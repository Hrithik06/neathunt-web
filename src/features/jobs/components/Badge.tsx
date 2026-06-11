import { STATUS_CFG } from "@/features/jobs/data/statusConfig";
type BadgeProps = {
  status: string;
  isMidnight: boolean;
};
// ── Badge — only needs isMidnight (display mode, not theme tokens) ─
const Badge = ({ status, isMidnight }: BadgeProps) => {
  const s = STATUS_CFG[status as keyof typeof STATUS_CFG];
  // const statusLabel = STATUS_LABELS[status as keyof typeof STATUS_LABELS];
  // console.log(s1);
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
      style={{
        color: isMidnight ? s.darkColor : s.color,
        background: isMidnight ? s.darkBg : s.bg,
      }}
    >
      {s.emoji} {s.label}
    </span>
  );
};
export default Badge;
