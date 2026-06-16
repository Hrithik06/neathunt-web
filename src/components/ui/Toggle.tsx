type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;

  label?: string;
  ariaLabel?: string;

  activeBg?: string;
  inactiveBg?: string;
};

export default function Toggle({
  checked,
  onChange,

  label,
  ariaLabel,

  activeBg = "#86EFAC", // green-300
  inactiveBg = "#64748B", // slate-500
}: ToggleProps) {
  return (
    <div className="flex gap-1.5 items-center">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-label={ariaLabel ?? label}
        aria-pressed={checked}
        className="
          relative w-8 h-5 rounded-full
          transition-all duration-300
          active:scale-95
        "
        style={{
          background: checked ? activeBg : inactiveBg,
        }}
      >
        <div
          className={`
            absolute top-1 left-1
            w-3 h-3 rounded-full
            bg-white shadow-md
            transition-all duration-300
            ${checked ? "translate-x-3" : ""}
          `}
        />
      </button>

      {label && (
        <span
          className="text-sm"
          style={{
            color: "var(--muted)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
