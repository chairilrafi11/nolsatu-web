import * as React from "react";
import { cn } from "@/shared/lib/cn";

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  variant: ToastVariant;
  message: string;
}

interface ToastContextValue {
  show: (message: string, variant?: ToastVariant) => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const STYLE: Record<ToastVariant, string> = {
  success: "border-success/30 bg-success-soft text-success-fg",
  error: "border-danger/30 bg-danger-soft text-danger-fg",
  info: "border-info/30 bg-info-soft text-info-fg",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const counter = React.useRef(0);

  const remove = React.useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const show = React.useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = ++counter.current;
      setItems((prev) => [...prev, { id, variant, message }]);
      window.setTimeout(() => remove(id), 4000);
    },
    [remove],
  );

  const value = React.useMemo<ToastContextValue>(
    () => ({
      show,
      success: (message: string) => show(message, "success"),
      error: (message: string) => show(message, "error"),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => remove(item.id)}
            className={cn(
              "pointer-events-auto animate-fadeUp cursor-pointer rounded-[10px] border px-4 py-3 text-left text-xs font-semibold shadow-floating",
              STYLE[item.variant],
            )}
          >
            {item.message}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam ToastProvider");
  return ctx;
}
