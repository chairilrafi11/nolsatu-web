import { IconBook2, IconFileText, IconLock } from "@tabler/icons-react";
import * as React from "react";

import { mockChapters, mockTracks } from "@/lib/mock/content";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";

export function AdminContentPage() {
  const [trackSlug, setTrackSlug] = React.useState("java");
  const track = mockTracks.find((item) => item.slug === trackSlug);
  const chapters = mockChapters[trackSlug] ?? [];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Konten</h1>
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-on-surface-variant">
          Materi dibaca langsung dari folder <span className="font-mono">content/</span> di repo.
          Edit markdown di sana, bukan lewat web — supaya riwayatnya jelas di git.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {mockTracks.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => setTrackSlug(item.slug)}
            className={cn(
              "cursor-pointer rounded-[10px] border px-3 py-1.5 text-xs font-semibold transition-colors",
              trackSlug === item.slug
                ? "border-primary bg-primary-soft text-on-primary-soft"
                : "border-surface-line bg-surface-raised text-on-surface-variant hover:border-on-surface-faint",
            )}
          >
            {item.title}
            <span className="ml-1.5 font-mono text-[10px] opacity-70">
              {mockChapters[item.slug]?.length ?? 0}
            </span>
          </button>
        ))}
      </div>

      {!track ? (
        <Card>
          <EmptyState icon={<IconBook2 size={18} />} title="Track tidak ditemukan" />
        </Card>
      ) : (
        <Card>
          <CardHeader className="border-b border-surface-line pb-3">
            <div>
              <CardTitle className="flex items-center gap-2">
                <IconBook2 size={14} /> {track.title}
              </CardTitle>
              <p className="mt-1 text-[11px] text-on-surface-variant">{track.tagline}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge status={track.status} />
              {!track.published && <Badge variant="neutral" label="Tidak tampil" />}
            </div>
          </CardHeader>

          <div className="divide-y divide-surface-line">
            {chapters.map((chapter) => (
              <div key={chapter.slug} className="flex items-center gap-3 px-4 py-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded border border-surface-line bg-surface-sunken font-mono text-[10px] font-bold text-on-surface-variant">
                  {String(chapter.position).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-xs font-semibold">{chapter.title}</p>
                    {!chapter.published && (
                      <span className="inline-flex items-center gap-1 rounded bg-surface-sunken px-1.5 py-0.5 font-mono text-[9px] uppercase text-on-surface-faint">
                        <IconLock size={8} /> draft
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate font-mono text-[10px] text-on-surface-faint">
                    content/{trackSlug}/bab/{String(chapter.position).padStart(2, "0")}-
                    {chapter.slug}.md · {chapter.estimatedMinutes} menit
                  </p>
                </div>
                <IconFileText size={14} className="shrink-0 text-on-surface-faint" />
              </div>
            ))}
          </div>

          <CardContent className="border-t border-surface-line">
            <div className="rounded-[10px] border border-dashed border-surface-line-strong bg-surface-sunken/40 p-4">
              <p className="text-[11px] font-bold">Cara menambah bab</p>
              <ol className="mt-2 flex flex-col gap-1 text-[11px] leading-relaxed text-on-surface-variant">
                <li>
                  1. Buat berkas{" "}
                  <span className="font-mono">content/{trackSlug}/bab/11-judul-bab.md</span> (prefix
                  angka menentukan urutan).
                </li>
                <li>2. Mulai dengan satu H1, lalu bagian H2 seperti bab lain.</li>
                <li>3. Simpan. Halaman track langsung membaca berkas baru (dev server).</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
