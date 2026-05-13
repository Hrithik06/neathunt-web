import NavBar from "@/layout/NavBar";
import Footer from "@/layout/Footer";
import Hero from "@/features/landing/components/Hero";
import DemoVideo from "@/features/landing/components/DemoVideo";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import HowItWorksSection from "@/features/landing/components/HowItWorksSection";
import StatsSection from "@/features/landing/components/StatsSection";
import TestimonialsSection from "@/features/landing/components/TestimonialsSection";
import FaqSection from "@/features/landing/components/FaqSection";
import FinalCTA from "@/features/landing/components/FinalCTA";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useEffect } from "react";

// ── Main ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const state = location.state as {
        from?: { pathname: string };
      };

      const redirectTo = state?.from?.pathname || "/dashboard";

      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  if (isLoading) return null;
  if (isAuthenticated) return null;
  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{
        background: "var(--page-bg)",
        fontFamily: "'Nunito','DM Sans',sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatA  { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
        @keyframes floatB  { 0%,100%{transform:translateY(0) rotate(3deg)}  50%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes floatC  { 0%,100%{transform:translateY(-4px)} 50%{transform:translateY(8px)} }
        @keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes blob    { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        @keyframes spinSlow{ from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .hero-title {
          background: linear-gradient(135deg,#1E2D5F 0%,#FF6B6B 50%,#FFC947 100%);
          background-size: 200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation: shimmer 4s linear infinite;
        }
        .blob      { animation: blob 8s ease-in-out infinite; }
        .float-a   { animation: floatA 6s ease-in-out infinite; }
        .float-b   { animation: floatB 7s ease-in-out infinite; }
        .float-c   { animation: floatC 5s ease-in-out infinite; }
        .fade-0    { animation: fadeUp .7s ease both; }
        .fade-1    { animation: fadeUp .7s ease .15s both; }
        .fade-2    { animation: fadeUp .7s ease .30s both; }
        .fade-3    { animation: fadeUp .7s ease .45s both; }
        .spin-slow { animation: spinSlow 20s linear infinite; }
        .feat-card:hover { transform:translateY(-4px); }
        .cta-main:hover  { transform:translateY(-2px); box-shadow:0 10px 30px rgba(255,107,107,0.4) !important; }
        .cta-ghost:hover { opacity:.75; }
      `}</style>
      {/* ── Navbar ─────────────────────────────────────────────── */}
      <NavBar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <Hero />

      {/* ── Demo Video ─────────────────────────────────────────────── */}
      <DemoVideo />

      {/* ── Stats ─────────────────────────────────────────────── */}
      <StatsSection />
      {/* ── Features ───────────────────────────────────────────── */}
      <FeaturesSection />

      {/* ── How it works ─────────────────────────────────────────────── */}
      <HowItWorksSection />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <FinalCTA />

      {/* ── Footer ─────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
