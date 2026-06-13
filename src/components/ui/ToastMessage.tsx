import { CircleCheck, TriangleAlert, CircleX, Info } from "lucide-react";
interface ToastProps {
  text: string;
  variant: "success" | "warning" | "error" | "info";
}
const ICONS = {
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleX,
  info: Info,
};
const VARIANT = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
} as const;
export default function ToastMessage({ text, variant }: ToastProps) {
  const type = VARIANT[variant];
  const Icon = ICONS[variant];

  return (
    <div
      className="text-sm p-4 rounded-md w-max min-w-xs max-w-sm"
      style={{
        background: `var(--${type}-bg)`,
        border: `1px solid var(--${type}-border)`,
        color: `var(--${type}-text)`,
      }}
      role="alert"
    >
      <div className="flex items-center gap-2.5 font-medium">
        {/*<Icon className="size-[18px]" />*/}
        <Icon size={18} />
        <p>{text}</p>
      </div>
    </div>
  );
}
