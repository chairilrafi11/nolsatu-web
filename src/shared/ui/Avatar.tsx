import { cn } from "@/shared/lib/cn";

export function Avatar({
  name,
  size = 32,
  className,
}: {
  name?: string | null;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary-soft font-bold text-on-primary-soft",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      title={name ?? "User"}
    >
      {toInitials(name)}
    </div>
  );
}

function toInitials(name?: string | null): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}
