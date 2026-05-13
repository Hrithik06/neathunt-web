import { BRAND } from "@/constants/brand";
import { useTheme } from "@/context/ThemeContext";

const Loader = () => {
  const { isMidnight } = useTheme();
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3 transition-opacity duration-300">
      <div className="font-black text-sm tracking-tight">
        <span className={`text-sm ${isMidnight && "text-white"}`}>Neat</span>
        <span style={{ color: BRAND.coral }}>Hunt</span>
      </div>
      <div className={`text-sm ${isMidnight && "text-white"}`}>
        Loading your dashboard...
      </div>
    </div>
  );
};
export default Loader;
