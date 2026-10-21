import {
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight,
  IconBook2,
  IconCheck,
  IconClock,
  IconFileCode,
  IconFileUpload,
  IconMessage,
  IconX,
} from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";
import * as React from "react";
import { SubmissionForm } from "@/features/submissions/components/SubmissionForm";
import { useChapter, useTrackDetail } from "@/lib/api/queries";
import { formatDate } from "@/lib/format";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { useToast } from "@/shared/ui/Toast";
import { extractHeadings, MarkdownRenderer } from "./MarkdownRenderer";

export function ChapterPage() {
  const { trackSlug, chapterSlug } = useParams({ from: "/app/tracks/$trackSlug/$chapterSlug" });
  const chapter = useChapter(trackSlug, chapterSlug);
  const detail = useTrackDetail(trackSlug);
  const toast = useToast();
  const [showForm, setShowForm] = React.useState(false);

  if (!chapter || !detail) {
    return (
      <EmptyState
        icon={<IconBook2 size={18} />}
        title="Bab tidak ditemukan"
        description="Materi ini belum tersedia atau sudah dipindahkan."
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

  const headings = extractHeadings(chapter.contentMd);
  const index = detail.chapters.findIndex((item) => item.slug === chapter.slug);
  const previous = index > 0 ? detail.chapters[index - 1] : null;
  const next = index >= 0 ? detail.chapters[index + 1] : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant">
        <Link to="/tracks" className="hover:text-on-surface">
          Track
        </Link>
        <span className="text-on-surface-faint">/</span>
        <Link to="/tracks/$trackSlug" params={{ trackSlug }} className="hover:text-on-surface">
          {detail.track.title}
        </Link>
        <span className="text-on-surface-faint">/</span>
        <span className="font-semibold text-on-surface">Bab {chapter.position}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0">
          <header className="mb-7 border-b border-surface-line pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">Bab {chapter.position}</span>
              <span className="text-on-surface-faint">·</span>
              <span className="eyebrow">{chapter.estimatedMinutes} menit baca</span>
              <Badge status={chapter.status} className="ml-auto" />
            </div>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {chapter.title}
            </h1>
            {chapter.summary && (
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-on-surface-variant">
                {chapter.summary}
              </p>
            )}
          </header>

          <MarkdownRenderer markdown={chapter.contentMd} />

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-surface-line pt-6">
            {previous ? (
              <Link
                to="/tracks/$trackSlug/$chapterSlug"
                params={{ trackSlug, chapterSlug: previous.slug }}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant hover:text-on-surface"
              >
                <IconArrowLeft size={13} /> Bab {previous.position}: {previous.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                to="/tracks/$trackSlug/$chapterSlug"
                params={{ trackSlug, chapterSlug: next.slug }}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary hover:underline"
              >
                Bab {next.position}: {next.title} <IconArrowRight size={13} />
              </Link>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex items-center gap-2">
                <StatusGlyph status={chapter.status} />
                <p className="text-xs font-bold">{statusTitle(chapter.status)}</p>
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                {statusBody(chapter.status)}
              </p>
              {chapter.lastSubmittedAt && (
                <p className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                  terakhir: {formatDate(chapter.lastSubmittedAt)}
                </p>
              )}
              <Button
                size="sm"
                variant={chapter.status === "approved" ? "outline" : "primary"}
                onClick={() => setShowForm(true)}
                className="mt-1"
              >
                <IconFileUpload size={14} />
                {chapter.status === "approved" ? "Kirim ulang" : "Upload hasil latihan"}
              </Button>
              {chapter.submissionId && (
                <Link
                  to="/submissions/$submissionId"
                  params={{ submissionId: chapter.submissionId }}
                  className="text-center text-[11px] font-semibold text-primary hover:underline"
                >
                  Lihat submission terakhir
                </Link>
              )}
            </CardContent>
          </Card>

          {headings.length > 0 && (
            <Card className="hidden lg:block">
              <CardContent className="p-4">
                <p className="eyebrow mb-2">Di bab ini</p>
                <nav className="flex flex-col gap-1">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={cn(
                        "line-clamp-2 text-[11px] leading-snug text-on-surface-variant transition-colors hover:text-primary",
                        heading.level === 3 && "pl-3 text-on-surface-faint",
                      )}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>
          )}

          <Card className="border-dashed bg-surface-sunken/40">
            <CardContent className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-on-surface-faint">
                Sebelum upload
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 text-[11px] leading-relaxed text-on-surface-variant">
                <li>1. Ketik sendiri, jangan copy-paste.</li>
                <li>2. Jalankan programnya di VS Code.</li>
                <li>3. Salin output terminal apa adanya.</li>
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-on-surface/40 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Upload hasil latihan"
        >
          <div className="animate-fadeUp my-6 w-full max-w-xl rounded-[14px] border border-surface-line bg-surface-raised shadow-floating">
            <div className="flex items-start gap-3 border-b border-surface-line p-5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">Upload hasil latihan</p>
                <p className="mt-0.5 text-[11px] text-on-surface-variant">
                  Bab {chapter.position} · {chapter.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cursor-pointer rounded p-1 text-on-surface-faint hover:text-on-surface"
                aria-label="Tutup"
              >
                <IconX size={16} />
              </button>
            </div>
            <div className="p-5">
              <SubmissionForm
                trackSlug={trackSlug}
                chapterSlug={chapterSlug}
                onSubmitted={(submissionId) => {
                  setShowForm(false);
                  toast.success("Tersimpan. Cek status di halaman submission.");
                  void submissionId;
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function statusTitle(status: string) {
  switch (status) {
    case "approved":
      return "Bab ini selesai";
    case "pending":
      return "Menunggu review";
    case "rejected":
      return "Perlu perbaikan";
    default:
      return "Belum dikerjakan";
  }
}

function statusBody(status: string) {
  switch (status) {
    case "approved":
      return "Submission kamu sudah disetujui. Kamu boleh lanjut ke bab berikutnya.";
    case "pending":
      return "Submission sedang diperiksa. Progres naik setelah disetujui.";
    case "rejected":
      return "Ada catatan dari reviewer. Baca catatannya, perbaiki, lalu kirim ulang.";
    default:
      return "Kerjakan latihan di akhir bab, jalankan di VS Code, lalu unggah berkas dan output-nya.";
  }
}

function StatusGlyph({ status }: { status: string }) {
  const base = "flex size-6 items-center justify-center rounded-full border";
  if (status === "approved")
    return (
      <span className={cn(base, "border-success/30 bg-success-soft text-success-fg")}>
        <IconCheck size={12} stroke={3} />
      </span>
    );
  if (status === "pending")
    return (
      <span className={cn(base, "border-warning/30 bg-warning-soft text-warning-fg")}>
        <IconClock size={12} />
      </span>
    );
  if (status === "rejected")
    return (
      <span className={cn(base, "border-danger/30 bg-danger-soft text-danger-fg")}>
        <IconAlertTriangle size={12} />
      </span>
    );
  return (
    <span
      className={cn(base, "border-surface-line-strong bg-surface-sunken text-on-surface-faint")}
    >
      <IconFileCode size={12} />
    </span>
  );
}

export function SubmissionMessageIcon() {
  return <IconMessage size={14} />;
}
