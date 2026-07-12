import ThemeToggle from "@/components/ui/ThemeToggle";
import { BRAND } from "@/constants/brand";
import Greeting from "./Greeting";

interface DashboardHeaderProps {
  handleCreate: () => void;
}

const DashboardHeader = ({ handleCreate }: DashboardHeaderProps) => {
  const gmailUpgrade = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    window.location.href = `${apiUrl}/api/auth/google/upgrade`;
  };
  return (
    <div
      className="
        sticky top-0 z-30 flex justify-end sm:justify-between items-start px-6 pt-4 pb-5 shadow-sm"
      style={{
        background: "var(--page-bg)",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      <div className="hidden pl-6 sm:block lg:pl-0">
        <Greeting />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        <button onClick={gmailUpgrade} style={{ color: "var(--error-text)" }}>
          Gmail Upgrade
        </button>

        <button
          className="cta-btn flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white border-0 cursor-pointer transition-all duration-200"
          style={{
            background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
            boxShadow: `0 4px 14px rgba(255,107,107,0.3)`,
          }}
          onClick={handleCreate}
        >
          + Log Application
        </button>
        {/* Modal lives in DashboardPage, not here */}
      </div>
    </div>
  );
};

export default DashboardHeader;
