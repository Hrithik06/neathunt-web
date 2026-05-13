import toast from "react-hot-toast";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";

const ICONS = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

export function showToast(text: string, variant: keyof typeof ICONS) {
  const Icon = ICONS[variant];

  toast.custom((t) => (
    <div
      style={{
        background: "var(--page-bg)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 rounded-md shadow-md"
        style={{
          background: `var(--${variant}-bg)`,
          color: `var(--${variant}-text)`,
          border: `1px solid var(--${variant}-border)`,
        }}
      >
        <Icon className="size-4" />
        <span>{text}</span>
      </div>
    </div>
  ));
}
