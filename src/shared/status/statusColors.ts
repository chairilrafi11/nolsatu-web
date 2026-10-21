export type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

const MAP: Record<string, StatusVariant> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  not_started: "neutral",
  live: "success",
  soon: "info",
  archive: "neutral",
  active: "success",
  inactive: "neutral",
  learner: "info",
  admin: "primary",
};

export function statusVariant(status?: string | null): StatusVariant {
  if (!status) return "neutral";
  return MAP[status] ?? "neutral";
}

const LABEL: Record<string, string> = {
  pending: "Menunggu review",
  approved: "Disetujui",
  rejected: "Perlu perbaikan",
  not_started: "Belum mulai",
  live: "Tersedia",
  soon: "Segera",
  archive: "Arsip",
  active: "Aktif",
  inactive: "Nonaktif",
  learner: "Learner",
  admin: "Admin",
};

export function statusLabel(status?: string | null): string {
  if (!status) return "—";
  return LABEL[status] ?? status;
}
