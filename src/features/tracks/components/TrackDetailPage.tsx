import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCircle,
  IconClock,
  IconX,
} from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";

import { useTrackDetail } from "@/lib/api/queries";
import { formatDate } from "@/lib/format";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Progress } from "@/shared/ui/Progress";

const STATUS_ICON = {
  approved: <IconCheck size={13} stroke={3} />,
  pending: <IconClock size={13} />,
  rejected: <IconX size={13} stroke={3} />,
  not_started: <IconCircle size={9} />,
} as const;

const STATUS_STYLE = {
  approved: "bg-success text-white border-success",
  pending: "bg-warning text-white border-warning",
  rejected: "bg-danger text-white border-danger",
  not_started: "bg-surface-raised text-on-surface-faint border-surface-line-strong",
} as const;

export function TrackDetailPage() {
  const { trackSlug } = useParams({ from: "/app/tracks/$trackSlug" });
  const detail = useTrackDetail(trackSlug);

  if (!detail) {
    return (
      <EmptyState
        icon={<IconCircle size={18} />}
        title="Track tidak ditemukan"
        description="Track ini belum tersedia atau sudah dipindahkan."
        action={
          <Link to="/tracks">
            <Button size="sm" variant="outline">
              Kembali ke daftar track
            </Button>
          </Link>
        }
      />
    );
  }

  const { track, chapters, approvedCount, pendingCount, totalCount } = detail;
  const percent = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;
  const nextChapter = chapters.find((chapter) => chapter.status !== "approved");

  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/tracks"
        className="inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant hover:text-on-surface"
      >
        <IconArrowLeft size={13} /> Semua track
      </Link>

      <header className="flex flex-col gap-4 border-b border-surface-line pb-6">
        <div className="flex flex-wrap items-start gap-3">
          <span className="flex size-12 items-center justify-center rounded-[10px] border border-surface-line bg-surface-sunken font-mono text-xs font-bold uppercase text-on-surface-variant">
            {track.language === "java" ? "Jv" : "C"}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{track.title}</h1>
              <Badge status={track.status} />
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">{track.tagline}</p>
          </div>
          {nextChapter && (
            <Link
              to="/tracks/$trackSlug/$chapterSlug"
              params={{ trackSlug: track.slug, chapterSlug: nextChapter.slug }}
            >
              <Button size="sm">
                {nextChapter.position === 1 ? "Mulai Bab 1" : `Lanjut Bab ${nextChapter.position}`}
                <IconArrowRight size={14} />
              </Button>
            </Link>
          )}
        </div>

        <p className="max-w-2xl text-xs leading-relaxed text-on-surface-variant">
          {track.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex min-w-40 flex-1 items-center gap-2">
            <Progress value={percent} className="max-w-56 flex-1" />
            <span className="font-mono text-[11px] font-bold tabular">{percent}%</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
            {approvedCount}/{totalCount} bab disetujui
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
            {pendingCount} menunggu review
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
            ±{track.estimatedHours} jam total
          </span>
        </div>
      </header>

      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Daftar bab</h2>
          <p className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
            berurutan · jangan loncat
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {chapters.map((chapter, index) => {
            const previous = chapters[index - 1];
            const suggested =
              chapter.status !== "approved" && (index === 0 || previous?.status === "approved");

            return (
              <Link
                key={chapter.slug}
                to="/tracks/$trackSlug/$chapterSlug"
                params={{ trackSlug: track.slug, chapterSlug: chapter.slug }}
                className={cn(
                  "group flex items-start gap-3 rounded-[14px] border bg-surface-raised p-4 transition-colors",
                  suggested
                    ? "border-primary/35 hover:border-primary"
                    : "border-surface-line hover:border-on-surface-faint",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px]",
                    STATUS_STYLE[chapter.status],
                  )}
                >
                  {chapter.status === "not_started" ? (
                    <span className="font-mono font-bold">{chapter.position}</span>
                  ) : (
                    STATUS_ICON[chapter.status]
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold text-on-surface">{chapter.title}</p>
                    {suggested && (
                      <span className="rounded bg-primary-soft px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-on-primary-soft">
                        disarankan
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
                    {chapter.summary || "Materi dan latihan."}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                    <span>{chapter.estimatedMinutes} menit baca</span>
                    {chapter.status !== "not_started" && (
                      <Badge status={chapter.status} dot={false} className="px-1.5 py-0" />
                    )}
                    {chapter.lastSubmittedAt && (
                      <span>dikirim {formatDate(chapter.lastSubmittedAt)}</span>
                    )}
                  </div>
                </div>

                <IconArrowRight
                  size={14}
                  className="mt-1.5 shrink-0 text-on-surface-faint transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <Card className="border-dashed bg-surface-sunken/40">
        <CardContent className="flex flex-wrap items-center gap-3 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold">Cara lulus satu bab</p>
            <p className="mt-1 text-[11px] leading-relaxed text-on-surface-variant">
              Baca materinya, ketik sendiri latihannya di VS Code, lalu unggah berkas + tempel
              output program. Bab dianggap selesai setelah submission kamu disetujui.
            </p>
          </div>
          <Link to="/submissions">
            <Button variant="outline" size="sm">
              Lihat submission saya
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
