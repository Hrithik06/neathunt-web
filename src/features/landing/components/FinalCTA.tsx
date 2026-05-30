import { BRAND } from "@/constants/brand";
import { useAuth } from "@/context/AuthContext";

const FinalCTA = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <section className="max-w-4xl mx-auto px-6 py-10 pb-20">
      <div
        className="relative rounded-3xl overflow-hidden text-center px-8 py-16"
        style={{ background: BRAND.dark }}
      >
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10 spin-slow"
          style={{
            background: `conic-gradient(${BRAND.gold},${BRAND.coral},${BRAND.mint},${BRAND.lavender},${BRAND.gold})`,
          }}
        />
        <div
          className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle,${BRAND.lavender},transparent)`,
          }}
        />
        <div className="relative z-10">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
            Your next offer starts here.
          </h2>
          <p
            className="text-base font-semibold mb-8 max-w-md mx-auto"
            style={{ color: "#94A3B8" }}
          >
            Stop losing track. Stop the spreadsheet chaos.
            <br />
            Start your job search with clarity and confidence.
          </p>
          <button
            className="cta-main font-black text-base px-10 py-4 rounded-2xl text-white border-0 cursor-pointer transition-all duration-200 inline-block"
            style={{
              background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
              boxShadow: "0 6px 24px rgba(255,107,107,0.45)",
              fontFamily: "inherit",
            }}
            onClick={loginWithGoogle}
          >
            Create your free account →
          </button>
          <p
            className="text-xs font-semibold mt-4"
            style={{ color: "#475569" }}
          >
            Free forever during beta · Setup in 2 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
