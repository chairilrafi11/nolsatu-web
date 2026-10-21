import {
  IconArrowRight,
  IconBook2,
  IconCheck,
  IconClock,
  IconFileCheck,
  IconFlame,
  IconX,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import type * as React from "react";
import { useDashboard } from "@/lib/api/queries";
import { formatDate, relativeTime } from "@/lib/format";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Progress } from "@/shared/ui/Progress";

export function DashboardPage() {
  const { user, tracks, submissions, stats, nextChapter } = useDashboard();
  const liveTracks = tracks.filter(({ track }) => track.status === "live");

  const recent = submissions.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Halo, {user?.displayName ?? "kamu"}.
          </h1>
          <p className="mt-1 text-xs text-on-surface-variant">
            {stats.pendingCount > 0
              ? `${stats.pendingCount} submission sedang menunggu review.`
              : "Tidak ada submission yang menggantung. Lanjut bab berikutnya."}
          </p>
        </div>
        {nextChapter && (
          <Link
            to="/tracks/$trackSlug/$chapterSlug"
            params={{
              trackSlug: nextChapter.trackSlug,
              chapterSlug: nextChapter.chapter.slug,
            }}
          >
            <Button>
              Lanjut: Bab {nextChapter.chapter.position}
              <IconArrowRight size={15} />
            </Button>
          </Link>
        )}
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Bab selesai" value={stats.approvedCount} icon={<IconCheck size={15} />} />
        <StatTile
          label="Menunggu review"
          value={stats.pendingCount}
          icon={<IconClock size={15} />}
          tone="warning"
        />
        <StatTile
          label="Perlu perbaikan"
          value={stats.rejectedCount}
          icon={<IconX size={15} />}
          tone="danger"
        />
        <StatTile
          label="Total submission"
          value={stats.submissions.length}
          icon={<IconFileCheck size={15} />}
          tone="secondary"
        />
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Progres per track</h2>
          <Link to="/tracks" className="text-[11px] font-bold text-primary hover:underline">
            Semua track
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {liveTracks.map(({ track, approvedCount, pendingCount, totalCount }) => {
            const percent = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;
            return (
              <Card key={track.slug}>
                <CardContent className="flex flex-col gap-3">
                  <div className="flex items-start gap-2">
                    <span className="flex size-8 items-center justify-center rounded-md border border-surface-line bg-surface-sunken font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                      {track.language === "java" ? "Jv" : "C"}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{track.title}</p>
                      <p className="truncate text-[11px] text-on-surface-variant">
                        {track.tagline}
                      </p>
                    </div>
                    <Badge status={track.status} className="ml-auto" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={percent} className="flex-1" />
                    <span className="font-mono text-[11px] font-bold tabular">{percent}%</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                    <span>
                      {approvedCount}/{totalCount} bab
                    </span>
                    {pendingCount > 0 && (
                      <span className="text-warning-fg">{pendingCount} menunggu</span>
                    )}
                    <Link
                      to="/tracks/$trackSlug"
                      params={{ trackSlug: track.slug }}
                      className="ml-auto inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      buka <IconArrowRight size={10} />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {nextChapter && (
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-bold">Disarankan berikutnya</h2>
          <Card className="overflow-hidden">
            <CardContent className="flex flex-wrap items-center gap-4">
              <span className="flex size-11 items-center justify-center rounded-[10px] border border-primary/25 bg-primary-soft text-on-primary-soft">
                <IconBook2 size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                  Bab {nextChapter.chapter.position} · {nextChapter.chapter.estimatedMinutes} menit
                </p>
                <p className="mt-0.5 truncate text-sm font-bold">{nextChapter.chapter.title}</p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-on-surface-variant">
                  {nextChapter.chapter.summary}
                </p>
              </div>
              <Link
                to="/tracks/$trackSlug/$chapterSlug"
                params={{
                  trackSlug: nextChapter.trackSlug,
                  chapterSlug: nextChapter.chapter.slug,
                }}
              >
                <Button variant="outline" size="sm">
                  Buka bab
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">Submission terakhir</h2>
          <Link to="/submissions" className="text-[11px] font-bold text-primary hover:underline">
            Riwayat lengkap
          </Link>
        </div>
        {recent.length === 0 ? (
          <Card>
            <EmptyState
              icon={<IconFileCheck size={18} />}
              title="Belum ada submission"
              description="Buka bab pertama, kerjakan latihannya di VS Code, lalu unggah hasilnya."
              action={
                <Link to="/tracks">
                  <Button size="sm">Pilih track</Button>
                </Link>
              }
            />
          </Card>
        ) : (
          <Card className="divide-y divide-surface-line">
            {recent.map((submission) => (
              <Link
                key={submission.id}
                to="/submissions/$submissionId"
                params={{ submissionId: submission.id }}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-sunken/60"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold">{submission.chapterTitle}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                    {submission.trackSlug} · {formatDate(submission.createdAt)}
                  </p>
                </div>
                <Badge status={submission.status} />
                <IconArrowRight size={13} className="shrink-0 text-on-surface-faint" />
              </Link>
            ))}
          </Card>
        )}
      </section>
    </div>
  );
}

function StatTile({
  label,
  value,
  icon,
  tone = "primary",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone?: "primary" | "warning" | "danger" | "secondary";
}) {
  const toneClass = {
    primary: "text-primary bg-primary-soft border-primary/20",
    warning: "text-warning-fg bg-warning-soft border-warning/25",
    danger: "text-danger-fg bg-danger-soft border-danger/25",
    secondary: "text-on-secondary-soft bg-secondary-soft border-secondary/25",
  }[tone];

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <span
          className={cn("flex size-8 items-center justify-center rounded-md border", toneClass)}
        >
          {icon}
        </span>
        <div>
          <p className="font-mono text-xl font-bold tabular leading-none">{value}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wide text-on-surface-faint">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center">
      <EmptyState
        icon={<IconFlame size={18} />}
        title="Halaman tidak ditemukan"
        description="Tautan ini mungkin sudah tidak berlaku."
        action={
          <Link to="/">
            <Button size="sm">Kembali ke dashboard</Button>
          </Link>
        }
      />
    </div>
  );
}

export function relativeTimeLabel(iso: string | null) {
  return relativeTime(iso);
}
