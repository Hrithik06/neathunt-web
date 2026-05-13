// type Props = {
//   onToggle: () => void;
//   icon: string;
//   label: string;
// };

// // No `t` prop — styling comes from CSS vars (--toggle-bg, --toggle-text)
// // Only icon + label stay in JS since they're content, not styles
// export default function ThemeToggle({ onToggle, icon, label }: Props) {
//   return (
//     <button
//       onClick={onToggle}
//       className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black border-0 cursor-pointer transition-all duration-300"
//       style={{
//         background: "var(--toggle-bg)",
//         color: "var(--toggle-text)",
//         fontFamily: "inherit",
//       }}
//     >
//       <span>{icon}</span>

//       <span className="hidden md:block"> {label}</span>
//     </button>
//   );
// }

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
