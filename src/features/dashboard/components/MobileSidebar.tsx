import Logo from "@/components/ui/Logo";
import { BRAND } from "@/constants/brand";
import { useEffect, useState } from "react";
import { AFFIRMATIONS } from "../data/affirmations";
import SidebarNav from "./SidebarNav";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { X } from "lucide-react";
import Greeting from "./Greeting";

type MobileSidebarProps = {
  counts: Record<string, number>;
  isOpen: boolean;
  onClose: () => void;
};
const MobileSidebar = ({ counts, isOpen, onClose }: MobileSidebarProps) => {
  const [affIdx, setAffIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setAffIdx((i) => (i + 1) % AFFIRMATIONS.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <aside
        className="
        fixed
        inset-y-0
        left-0
        w-[85%]
        max-w-[350px]
        z-50
        flex
        flex-col
        py-6
        h-screen
      "
        style={{ background: "var(--sidebar-bg)" }}
      >
        <div className="flex items-center justify-between px-5 pb-7">
          {/* Brand */}
          <div className="flex items-center gap-3">
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
          {/*Close Sidebar*/}
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="cursor-pointer"
          >
            <X color="var(--muted)" size={32} />
          </button>
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
        <div
          className="p-5 border-b sm:hidden"
          style={{ borderColor: "var(--card-border)" }}
        >
          <Greeting headingColor="#fff" subTextColor="rgba(255,255,255,0.7)" />
        </div>
        <div
          className="flex gap-4 items-center p-5 border-b sm:hidden"
          style={{ borderColor: "var(--card-border)" }}
        >
          <span className="text-white">Theme Toggle</span>
          <ThemeToggle />
        </div>

        <SidebarNav counts={counts} />
      </aside>
    </>
  );
};

export default MobileSidebar;
