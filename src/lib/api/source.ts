/**
 * Data source seam. Saat ini hanya `mock` yang aktif; `api` disiapkan untuk fase
 * setelah kontrak API dikunci (spec §6). Halaman dan hook TIDAK boleh memanggil
 * mock store secara langsung — selalu lewat `@/lib/api/queries`.
 */
export type DataSource = "mock" | "api";

export const DATA_SOURCE: DataSource =
  (import.meta.env.VITE_DATA_SOURCE as DataSource | undefined) ?? "mock";

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3170";
