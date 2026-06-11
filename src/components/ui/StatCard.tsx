import { BRAND } from "@/constants/brand";
import AnimCount from "./AnimCount";

type StatCardProps = {
  emoji: string;
  label: string;
  value: number | string;
  isHero?: boolean;
};
// ── StatCard — reads CSS vars, no t prop ──────────────────────────
const StatCard = ({ emoji, label, value, isHero }: StatCardProps) => (
  <div
    className={`relative flex-1 min-w-32 rounded-2xl p-5 overflow-hidden border ${isHero ? "border-transparent shadow-xl" : ""}`}
    style={{
      background: isHero ? "var(--hero-card-bg)" : "var(--card-bg)",
      borderColor: isHero ? "transparent" : "var(--card-border)",
    }}
  >
    {isHero && (
      <>
        <div
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10"
          style={{ background: BRAND.gold }}
        />
        <div
          className="absolute -bottom-6 -left-4 w-16 h-16 rounded-full opacity-10"
          style={{ background: BRAND.coral }}
        />
      </>
    )}
    <div className="text-2xl mb-2">{emoji}</div>
    <div
      className="text-3xl font-black leading-none"
      style={{ color: isHero ? "var(--hero-text)" : "var(--heading)" }}
    >
      <AnimCount
        target={
          typeof value === "number" ? value : parseInt(String(value)) || 0
        }
      />
      {typeof value === "string" && value.includes("%") ? "%" : ""}
    </div>
    <div
      className="text-xs font-bold mt-2"
      style={{ color: isHero ? "var(--hero-sub)" : "var(--muted)" }}
    >
      {label}
    </div>
  </div>
);
export default StatCard;
