import ThemeToggle from "@/components/ui/ThemeToggle";
import { BRAND } from "@/constants/brand";
import Greeting from "./Greeting";

interface DashboardHeaderProps {
  handleCreate: () => void;
}

const DashboardHeader = ({ handleCreate }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-end sm:justify-between items-start mb-7 fade-up ml-4">
      <div className="hidden sm:block lg:ml-0">
        <Greeting />
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

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
