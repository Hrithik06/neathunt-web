import { BRAND } from "@/constants/brand";
import Logo from "../components/ui/Logo";
import ThemeToggle from "../components/ui/ThemeToggle";
// import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  // const { toggle, meta } = useTheme();
  // const handleToggle = () => {
  //   toggle();
  // };
  return (
    <footer
      className="border-t py-8 px-6 transition-colors duration-500"
      style={{ borderColor: "var(--footer-border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span
            className="font-black text-sm"
            style={{ color: "var(--heading)" }}
          >
            Neat
          </span>
          <span className="font-black text-sm" style={{ color: BRAND.coral }}>
            Hunt
          </span>
        </div>
        <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
          Built with ❤️ for job seekers everywhere. You've got this. 🌟
        </p>
        <div className="flex items-center gap-5">
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a
              key={l}
              href="#"
              className="text-xs font-bold no-underline"
              style={{ color: "var(--muted)" }}
            >
              {l}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
