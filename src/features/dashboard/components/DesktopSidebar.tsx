import Logo from "@/components/ui/Logo";
import { BRAND } from "@/constants/brand";
import { useEffect, useState } from "react";
import { AFFIRMATIONS } from "../data/affirmations";
import SidebarNav from "./SidebarNav";

type DasboardSidebarProps = {
  counts: Record<string, number>;
};
const DasboardSidebar = ({ counts }: DasboardSidebarProps) => {
  const [affIdx, setAffIdx] = useState(0);

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

      <SidebarNav counts={counts} />
    </aside>
  );
};

export default DasboardSidebar;
