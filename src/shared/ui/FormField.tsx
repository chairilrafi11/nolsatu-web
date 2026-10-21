import type * as React from "react";
import { cn } from "@/shared/lib/cn";

export function FormField({
  label,
  required,
  error,
  hint,
  htmlFor,
  children,
  className,
}: {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-xs font-bold text-on-surface">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-[11px] text-on-surface-faint">{hint}</p>}
      {error && <p className="text-[11px] font-medium text-danger-fg">{error}</p>}
    </div>
  );
}
