import * as React from "react";
import { cn } from "@/shared/lib/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      "h-10 w-full rounded-[10px] border border-surface-line-strong bg-surface-raised px-3 text-sm text-on-surface transition-colors placeholder:text-on-surface-faint hover:border-on-surface-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
