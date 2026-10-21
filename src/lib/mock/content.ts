import type { Chapter, Track } from "@/lib/api/types";

/**
 * Materi diambil langsung dari folder `content/` di root project (markdown apa adanya).
 * Di fase mock ini satu-satunya sumber konten; setelah kontrak API dikunci, isi yang sama
 * akan datang dari `GET /tracks/{slug}`.
 */
const javaChapters = import.meta.glob("../../content/java/bab/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const cChapters = import.meta.glob("../../content/c/bab/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const reactChapters = import.meta.glob("../../content/react/bab/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function fileName(path: string): string {
  return path.split("/").pop() ?? path;
}

function slugFromFile(path: string): string {
  return fileName(path).replace(/\.md$/, "").replace(/^\d+-/, "");
}

function positionFromFile(path: string): number {
  const match = fileName(path).match(/^(\d+)-/);
  return match ? Number(match[1]) : 999;
}

function titleFromMarkdown(raw: string, fallback: string): string {
  const h1 = raw.match(/^#\s+(.+)$/m);
  if (!h1) return fallback;
  return h1[1].replace(/^Bab\s+\d+\s+[—-]\s+/i, "").trim();
}

function summaryFromMarkdown(raw: string): string {
  const firstParagraph = raw
    .split(/^##\s+/m)[0]
    .split("\n")
    .map((line) => line.trim())
    .find(
      (line) =>
        line.length > 60 &&
        !line.startsWith("#") &&
        !line.startsWith(">") &&
        !line.startsWith("```") &&
        !line.startsWith("|"),
    );
  if (!firstParagraph) return "";
  return firstParagraph.replace(/[*_`]/g, "").slice(0, 180);
}

function readMinutes(raw: string): number {
  const words = raw.split(/\s+/).length;
  return Math.max(4, Math.round(words / 180));
}

function buildChapters(trackSlug: string, files: Record<string, string>): Chapter[] {
  return Object.entries(files)
    .map(([path, contentMd]) => {
      const position = positionFromFile(path);
      const slug = slugFromFile(path);
      return {
        trackSlug,
        slug,
        title: titleFromMarkdown(contentMd, slug),
        position,
        summary: summaryFromMarkdown(contentMd),
        contentMd,
        estimatedMinutes: readMinutes(contentMd),
        published: true,
      } satisfies Chapter;
    })
    .sort((a, b) => a.position - b.position);
}

export const mockChapters: Record<string, Chapter[]> = {
  java: buildChapters("java", javaChapters),
  c: buildChapters("c", cChapters),
  react: buildChapters("react", reactChapters).map((chapter) => ({
    ...chapter,
    published: false,
  })),
};

export const mockTracks: Track[] = [
  {
    slug: "java",
    title: "Java",
    tagline: "Bahasa pertama yang paling aman untuk pemula",
    description:
      "Mulai dari nol: apa itu program, variabel, input, percabangan, perulangan, sampai class & object. Setiap bab memakai analogi yang dekat dengan kehidupan sehari-hari, lalu ditutup latihan yang benar-benar harus kamu ketik sendiri.",
    language: "java",
    position: 1,
    status: "live",
    published: true,
    chapterCount: mockChapters.java.length,
    estimatedHours: 14,
  },
  {
    slug: "c",
    title: "C",
    tagline: "Melihat langsung ke mesin, tanpa lapisan",
    description:
      "Setelah Java, C membuat banyak hal terasa lebih jelas: memori, pointer, dan bagaimana komputer benar-benar bekerja. Ditulis bertahap, mulai dari yang paling dasar.",
    language: "c",
    position: 2,
    status: "live",
    published: true,
    chapterCount: mockChapters.c.length,
    estimatedHours: 8,
  },
  {
    slug: "react",
    title: "React + Vite",
    tagline: "Merakit antarmuka dari komponen",
    description:
      "Membangun dashboard CRUD mahasiswa bertahap: setup, komponen, state, form, dan localStorage. Materi ini disiapkan sebagai lanjutan setelah dasar-dasar pemrograman kuat.",
    language: "react",
    position: 3,
    status: "archive",
    published: false,
    chapterCount: mockChapters.react.length,
    estimatedHours: 12,
  },
];

export function findTrack(slug: string): Track | undefined {
  return mockTracks.find((track) => track.slug === slug);
}

export function findChapter(trackSlug: string, chapterSlug: string): Chapter | undefined {
  return mockChapters[trackSlug]?.find((chapter) => chapter.slug === chapterSlug);
}
