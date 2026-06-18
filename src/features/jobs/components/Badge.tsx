import { useTheme } from "@/context/ThemeContext";

type BadgeProps = {
  badgeCfg: {
    label: string;
    color: string;
    darkColor: string;
    bg: string;
    darkBg: string;
    emoji?: string;
  };
};
const Badge = ({ badgeCfg }: BadgeProps) => {
  const { label, color, darkColor, bg, darkBg, emoji } = badgeCfg;

  const { isMidnight } = useTheme();

  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
      style={{
        color: isMidnight ? darkColor : color,
        background: isMidnight ? darkBg : bg,
      }}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </span>
  );
};
export default Badge;
