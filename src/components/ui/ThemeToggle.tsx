import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { isMidnight, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`
        relative w-12 h-7 rounded-full transition-all duration-300
        ${isMidnight ? "bg-slate-700" : "bg-yellow-300"}
        active:scale-95
      `}
    >
      {/* Thumb */}
      <div
        className={`
          absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-md
          flex items-center justify-center text-xs
          transition-all duration-300
          ${isMidnight ? "translate-x-5" : "translate-x-0"}
        `}
      >
        {isMidnight ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
