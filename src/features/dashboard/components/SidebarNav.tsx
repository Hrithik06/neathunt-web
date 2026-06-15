import { BRAND } from "@/constants/brand";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const NAV = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "📋", label: "Applications" },
  { icon: "🗓️", label: "Interviews" },
  { icon: "📈", label: "Analytics" },
  { icon: "⚙️", label: "Settings" },
];
type SidebarNavProps = {
  counts: Record<string, number>;
};
export default function SidebarNav({ counts }: SidebarNavProps) {
  const { isMidnight } = useTheme();
  const [activeNav, setActiveNav] = useState(0);

  const { logout } = useAuth();
  return (
    <>
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
          {counts.OFFER || 0} offer{(counts.OFFER || 0) !== 1 ? "s" : ""} so
          far!
          <br />
          <span className="font-medium opacity-75">Keep planting seeds.</span>
        </div>
      </div>
      {/* Logout */}
      <button
        className="hidden md:flex gap-1 items-center justify-center text-white/60 hover:text-white text-lg  mt-3 cursor-pointer"
        onClick={logout}
      >
        <LogOut className="text-red-400" />
        <span>Logout</span>
      </button>
    </>
  );
}
