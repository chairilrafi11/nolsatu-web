import { IconArrowRight, IconBook2, IconClock, IconLock } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { useTrackList } from "@/lib/api/queries";
import { Badge } from "@/shared/ui/Badge";
import { Card, CardContent } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Progress } from "@/shared/ui/Progress";

export function TracksPage() {
  const tracks = useTrackList();
  const live = tracks.filter(({ track }) => track.status !== "archive");
  const archived = tracks.filter(({ track }) => track.status === "archive");

  return (
    <div className="flex flex-col gap-8">
      <header>
        <p className="eyebrow">Kurikulum</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Track</h1>
        <p className="mt-1 max-w-lg text-xs leading-relaxed text-on-surface-variant">
          Satu track = satu bahasa. Mulai dari Java, lanjut ke C setelah dasar-dasarnya kuat. Materi
          disusun berurutan; jangan loncat bab.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {live.map(({ track, approvedCount, pendingCount, totalCount }) => {
          const percent = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;
          return (
            <Card key={track.slug} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-surface-line bg-surface-sunken font-mono text-[11px] font-bold uppercase text-on-surface-variant">
                    {track.language === "java" ? "Jv" : "C"}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold">{track.title}</h2>
                      <Badge status={track.status} />
                    </div>
                    <p className="mt-0.5 text-[11px] text-on-surface-variant">{track.tagline}</p>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-on-surface-variant">
                  {track.description}
                </p>

                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Progress value={percent} className="flex-1" />
                    <span className="font-mono text-[11px] font-bold tabular">{percent}%</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                    <span>{totalCount} bab</span>
                    <span>±{track.estimatedHours} jam</span>
                    <span>{approvedCount} selesai</span>
                    {pendingCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-warning-fg">
                        <IconClock size={10} /> {pendingCount} review
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to="/tracks/$trackSlug"
                  params={{ trackSlug: track.slug }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-surface-line-strong px-3 py-2 text-xs font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <IconBook2 size={14} />
                  {approvedCount > 0 ? "Lanjutkan" : "Mulai track"}
                  <IconArrowRight size={13} />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {archived.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <IconLock size={13} className="text-on-surface-faint" />
            <h2 className="text-xs font-bold text-on-surface-variant">Belum dibuka</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {archived.map(({ track }) => (
              <Card key={track.slug} className="bg-surface-sunken/40">
                <CardContent className="flex items-start gap-3 py-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-surface-line bg-surface-raised font-mono text-[10px] font-bold uppercase text-on-surface-faint">
                    Re
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-on-surface-variant">{track.title}</p>
                      <Badge status="archive" />
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed text-on-surface-faint">
                      {track.tagline} — dibuka setelah dasar Java dan C selesai.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {live.length === 0 && (
        <Card>
          <EmptyState
            icon={<IconBook2 size={18} />}
            title="Belum ada track"
            description="Konten sedang disiapkan."
          />
        </Card>
      )}
    </div>
  );
}
