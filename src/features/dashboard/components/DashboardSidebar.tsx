import Logo from "@/components/ui/Logo";
import { BRAND } from "@/constants/brand";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { AFFIRMATIONS } from "../data/affirmations";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "📋", label: "Applications" },
  { icon: "🗓️", label: "Interviews" },
  { icon: "📈", label: "Analytics" },
  { icon: "⚙️", label: "Settings" },
];
type Props = {
  counts: Record<string, number>;
};
const DasboardSidebar = ({ counts }: Props) => {
  const { isMidnight } = useTheme();
  const [affIdx, setAffIdx] = useState(0);
  const [activeNav, setActiveNav] = useState(0);

  const { logout } = useAuth();
  useEffect(() => {
    const timer = setInterval(
      () => setAffIdx((i) => (i + 1) % AFFIRMATIONS.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <aside
      className="w-56 flex flex-col py-6 shrink-0 sticky top-0 h-screen transition-colors duration-500"
      style={{ background: "var(--sidebar-bg)" }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 pb-7">
        <Logo size={40} />
        <div>
          <div className="font-black text-sm tracking-tight">
            <span className="text-white">Neat</span>
            <span style={{ color: BRAND.coral }}>Hunt</span>
          </div>
          <div className="text-xs font-bold" style={{ color: BRAND.gold }}>
            YOU'VE GOT THIS ✨
          </div>
        </div>
      </div>
      {/* Affirmation ticker */}
      <div
        className="mx-3 mb-5 rounded-xl px-3 py-3 border-l-4 min-h-12 overflow-hidden"
        style={{
          background: "rgba(255,201,71,0.08)",
          borderColor: BRAND.gold,
        }}
      >
        <p
          key={affIdx}
          className="ticker-text text-xs font-bold leading-relaxed"
          style={{ color: BRAND.gold }}
        >
          {AFFIRMATIONS[affIdx]}
        </p>
      </div>
      {/* Nav */}
      <nav className="flex-1">
        {NAV.map((item, i) => (
          <button
            key={item.label}
            className="nav-item w-full flex items-center gap-3 px-5 py-3 transition-all duration-150 cursor-pointer border-0 bg-transparent border-l-4 text-left"
            style={{
              borderColor: activeNav === i ? BRAND.gold : "transparent",
            }}
            onClick={() => setActiveNav(i)}
          >
            <span className="text-base">{item.icon}</span>
            <span
              className={`text-sm ${activeNav === i ? "font-black" : "font-medium"}`}
              style={{
                color:
                  activeNav === i
                    ? "var(--sidebar-active)"
                    : "var(--sidebar-text)",
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      {/* Growth card */}
      <div
        className="mx-3 rounded-xl p-4 border"
        style={{
          background: isMidnight
            ? "rgba(6,214,160,0.07)"
            : "rgba(6,214,160,0.1)",
          borderColor: "rgba(6,214,160,0.2)",
        }}
      >
        <div className="text-xl mb-1">🌱</div>
        <div
          className="text-xs font-bold leading-relaxed"
          style={{ color: BRAND.mint }}
        >
          {counts.Offer || 0} offer{(counts.Offer || 0) !== 1 ? "s" : ""} so
          far!
          <br />
          <span className="font-medium opacity-75">Keep planting seeds.</span>
        </div>
      </div>
      <button
        className="text-white/60 hover:text-white text-lg flex gap-1 items-center justify-center mt-3"
        onClick={logout}
      >
        <img src="/power.svg" alt="Logout" className="w-6 h-6" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default DasboardSidebar;
