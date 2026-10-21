import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-2 py-12 text-center", className)}
    >
      {icon && (
        <div className="mb-1 flex size-10 items-center justify-center rounded-[10px] border border-surface-line bg-surface-sunken text-on-surface-variant">
          {icon}
        </div>
      )}
      <p className="text-sm font-bold text-on-surface">{title}</p>
      {description && (
        <p className="max-w-sm text-xs leading-relaxed text-on-surface-variant">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
