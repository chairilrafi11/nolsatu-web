import { cn } from "@/shared/lib/cn";
import { type StatusVariant, statusLabel, statusVariant } from "@/shared/status/statusColors";

const STYLE: Record<StatusVariant, string> = {
  success: "bg-success-soft text-success-fg border-success/25",
  warning: "bg-warning-soft text-warning-fg border-warning/25",
  danger: "bg-danger-soft text-danger-fg border-danger/25",
  info: "bg-info-soft text-info-fg border-info/25",
  neutral: "bg-surface-sunken text-on-surface-variant border-surface-line",
  primary: "bg-primary-soft text-on-primary-soft border-primary/25",
};

export function Badge({
  status,
  variant,
  label,
  dot = true,
  className,
}: {
  status?: string | null;
  variant?: StatusVariant;
  label?: string;
  dot?: boolean;
  className?: string;
}) {
  const resolved = variant ?? statusVariant(status);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide",
        STYLE[resolved],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {label ?? statusLabel(status)}
    </span>
  );
}
