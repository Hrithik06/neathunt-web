import { BRAND } from "@/constants/brand";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
const Hero = () => {
  const { isMidnight } = useTheme();
  const { loginWithGoogle } = useAuth();
  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-10 text-center overflow-hidden">
      <div
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 blob pointer-events-none"
        style={{
          background: `radial-gradient(circle,${BRAND.gold},${BRAND.coral})`,
        }}
      />
      <div
        className="absolute -top-10 -right-16 w-56 h-56 rounded-full opacity-15 blob pointer-events-none"
        style={{
          background: `radial-gradient(circle,${BRAND.lavender},${BRAND.mint})`,
          animationDelay: "3s",
        }}
      />

      <div
        className="fade-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-6 border"
        style={{
          background: "var(--eyebrow-bg)",
          borderColor: "var(--eyebrow-border)",
          color: "var(--eyebrow-text)",
        }}
      >
        ✨ Built for the job seeker grind
      </div>

      <h1 className="fade-1 text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6 max-w-4xl mx-auto">
        <span className="hero-title">Your job search,</span>
        <br />
        <span style={{ color: "var(--heading)" }}>finally under control.</span>
      </h1>

      <p
        className="fade-2 text-lg font-semibold max-w-xl mx-auto mb-8 leading-relaxed"
        style={{ color: "var(--body)" }}
      >
        Spreadsheets weren't built for job hunting. NeatHunt gives you a visual
        pipeline that tracks every application automatically — so nothing slips
        through the cracks. Because the hardest part isn't finding jobs. It's
        staying in the game.
      </p>

      <div className="fade-3 flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
        <button
          className="cta-main font-black text-base px-8 py-4 rounded-2xl text-white border-0 cursor-pointer transition-all duration-200"
          style={{
            background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
            boxShadow: "0 6px 20px rgba(255,107,107,0.35)",
            fontFamily: "inherit",
          }}
          onClick={loginWithGoogle}
        >
          Start tracking for free 🚀
        </button>
        <button
          className="cta-ghost font-bold text-sm px-6 py-4 rounded-2xl border-2 cursor-pointer bg-transparent transition-opacity duration-200"
          style={{
            borderColor: isMidnight ? "rgba(255,201,71,0.3)" : "#FFE082",
            color: "var(--heading)",
            fontFamily: "inherit",
          }}
        >
          See how it works ↓
        </button>
      </div>
      <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
        Free forever · No credit card · Gmail required for auto-sync
      </p>

      {/* Floating badges */}
      <div className="relative h-16 mt-4 pointer-events-none select-none hidden md:block">
        {[
          { emoji: "🎉", label: "Got the offer!", x: "10%", cls: "float-a" },
          {
            emoji: "🎤",
            label: "Interview tomorrow",
            x: "25%",
            cls: "float-b",
          },
          {
            emoji: "📬",
            label: "12 apps this week",
            x: "65%",
            cls: "float-c",
          },
          {
            emoji: "📈",
            label: "38% response rate",
            x: "80%",
            cls: "float-a",
          },
        ].map((b) => (
          <div
            key={b.label}
            className={`absolute ${b.cls} flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-md`}
            style={{
              left: b.x,
              background: "var(--badge-bg)",
              border: `1.5px solid ${BRAND.gold}30`,
              color: "var(--heading)",
            }}
          >
            {b.emoji} {b.label}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
