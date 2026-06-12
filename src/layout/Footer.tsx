import { BRAND } from "@/constants/brand";
import Logo from "../components/ui/Logo";
import ThemeToggle from "../components/ui/ThemeToggle";

const Footer = () => {
  return (
    <footer
      className="border-t py-8 px-6 transition-colors duration-500"
      style={{ borderColor: "var(--footer-border)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
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

        <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
          Built with ❤️ for job seekers everywhere. You've got this. 🌟
        </p>
        <div className="flex items-center gap-5">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs font-bold no-underline"
              style={{ color: "var(--muted)" }}
            >
              {link}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
