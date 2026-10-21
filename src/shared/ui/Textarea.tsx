import * as React from "react";
import { cn } from "@/shared/lib/cn";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full resize-y rounded-[10px] border border-surface-line-strong bg-surface-raised px-3 py-2.5 font-mono text-[13px] leading-relaxed text-on-surface transition-colors placeholder:font-sans placeholder:text-on-surface-faint hover:border-on-surface-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
