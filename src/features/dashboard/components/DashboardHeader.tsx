import ThemeToggle from "@/components/ui/ThemeToggle";
import { BRAND } from "@/constants/brand";
import { useGreeting } from "@/hooks/useGreeting";

interface DashboardHeaderProps {
  onOpenModal: () => void;
}

const DashboardHeader = ({ onOpenModal }: DashboardHeaderProps) => {
  const { firstName, greeting, emoji, subText } = useGreeting();

  return (
    <div className="flex justify-between items-start mb-7 fade-up">
      <div>
        <h1
          className="text-2xl font-black tracking-tight"
          style={{ color: "var(--heading)" }}
        >
          {greeting} {emoji}, {firstName}
        </h1>
        <p
          className="text-sm font-semibold mt-1"
          style={{ color: "var(--muted)" }}
        >
          {subText}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          className="cta-btn flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white border-0 cursor-pointer transition-all duration-200"
          style={{
            background: `linear-gradient(135deg,${BRAND.coral},#FF8E53)`,
            boxShadow: `0 4px 14px rgba(255,107,107,0.3)`,
          }}
          onClick={onOpenModal}
        >
          + Log Application
        </button>
        {/* Modal lives in DashboardPage, not here */}
      </div>
    </div>
  );
};

export default DashboardHeader;
