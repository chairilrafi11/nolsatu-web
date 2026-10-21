import { cn } from "@/shared/lib/cn";

/**
 * Logo NolSatu — dua bentuk: lingkaran kosong (nol) dan garis tegak (satu).
 * Menggambarkan perjalanan dari nol menuju satu, sekaligus binary 0/1.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      aria-hidden
      className={cn(className)}
    >
      <circle cx="8" cy="12" r="4.6" />
      <path d="M16.4 7.4v9.2" />
      <path d="M14.2 9.6l2.2-2.2" />
    </svg>
  );
}
