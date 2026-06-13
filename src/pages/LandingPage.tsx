import "./LandigPage.css";
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

  // if (isLoading) return null;
  // if (isAuthenticated) return null;
  return (
    <div
      className="min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{
        background: "var(--page-bg)",
        fontFamily: "'Nunito','DM Sans',sans-serif",
      }}
    >
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
