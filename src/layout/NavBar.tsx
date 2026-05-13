import { BRAND } from "@/constants/brand";
import Logo from "../components/ui/Logo";
import ThemeToggle from "../components/ui/ThemeToggle";
import { useEffect, useState } from "react";
// import { useTheme } from "@/context/ThemeContext";
// import axios from "axios";

const NavBar = () => {
  // const { toggle } = useTheme();

  const [scrollY, setScrollY] = useState(0);

  // Reset counter animation on theme switch so it re-runs
  // const handleToggle = () => {
  //   toggle();
  //   // setStatsInView(false);
  //   // setTimeout(() => setStatsInView(true), 120);
  // };
  const handleGoogleLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

    window.location.href = `${apiUrl}/api/auth/google`;
  };
  // const getMe = async () => {
  // const data = await axios
  //   .get(`${apiUrl}/api/auth/me`, {
  //     withCredentials: true,
  //   })
  //   .catch((err) => console.log(err));
  //   console.log(data);
  //   alert(data);
  // };
  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrollY > 40 ? "var(--nav-scroll-bg)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
        borderBottom:
          scrollY > 40
            ? "1px solid var(--nav-border)"
            : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Logo size={36} />
          <div>
            <span
              className="font-black text-base tracking-tight"
              style={{ color: "var(--heading)" }}
            >
              Neat
            </span>
            <span
              className="font-black text-base tracking-tight"
              style={{ color: BRAND.coral }}
            >
              Hunt
            </span>
            {/*<span
              className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: BRAND.coral }}
            >
              BETA
            </span>*/}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {["Features", "How it works", "FAQ"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-bold no-underline transition-colors duration-200"
              style={{ color: "var(--muted)" }}
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/*<button
            className="cta-ghost text-sm font-bold px-4 py-2 rounded-xl border-0 bg-transparent cursor-pointer transition-opacity duration-200"
            style={{ color: "var(--heading)", fontFamily: "inherit" }}
            onClick={getMe}
          >
            Sign in
          </button>*/}
          <button
            className="cta-main text-sm font-black px-5 py-2.5 rounded-xl text-white border-0 cursor-pointer transition-all duration-200 flex items-center gap-2 hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
              boxShadow: "0 4px 14px rgba(255,107,107,0.3)",
            }}
            onClick={handleGoogleLogin}
          >
            <img src="/google-color.svg" alt="Google" className="w-4 h-4" />
            <span className="hidden md:block">Continue with Google</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
