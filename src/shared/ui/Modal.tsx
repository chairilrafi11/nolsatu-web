import * as React from "react";
import { cn } from "@/shared/lib/cn";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Tutup"
        onClick={onClose}
        className="absolute inset-0 cursor-pointer bg-on-surface/35 backdrop-blur-[2px]"
      />
      <div
        className={cn(
          "animate-fadeUp relative z-10 flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-[14px] border border-surface-line bg-surface-raised shadow-floating",
          className,
        )}
      >
        {(title || description) && (
          <div className="flex flex-col gap-1 border-b border-surface-line p-5">
            {title && <h2 className="text-sm font-bold text-on-surface">{title}</h2>}
            {description && <p className="text-xs text-on-surface-variant">{description}</p>}
          </div>
        )}
        {children && <div className="overflow-y-auto p-5">{children}</div>}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-surface-line bg-surface-sunken/50 p-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
