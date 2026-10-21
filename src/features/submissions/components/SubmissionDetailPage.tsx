import { IconArrowLeft, IconFileCode, IconMessageCircle, IconTerminal2 } from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";
import * as React from "react";

import { useSubmission } from "@/lib/api/queries";
import { formatBytes, formatDate } from "@/lib/format";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";

export function SubmissionDetailPage() {
  const { submissionId } = useParams({ from: "/app/submissions/$submissionId" });
  const submission = useSubmission(submissionId);
  const [activeFile, setActiveFile] = React.useState(0);

  if (!submission) {
    return (
      <EmptyState
        icon={<IconFileCode size={18} />}
        title="Submission tidak ditemukan"
        description="Submission ini sudah dihapus atau bukan milikmu."
        action={
          <Link to="/submissions">
            <Button size="sm" variant="outline">
              Kembali
            </Button>
          </Link>
        }
      />
    );
  }

  const file = submission.files[activeFile] ?? submission.files[0];

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/submissions"
        className="inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold text-on-surface-variant hover:text-on-surface"
      >
        <IconArrowLeft size={13} /> Semua submission
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-surface-line pb-5">
        <div>
          <p className="eyebrow">
            {submission.trackSlug} · {submission.chapterSlug}
          </p>
          <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            {submission.chapterTitle}
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
            dikirim {formatDate(submission.createdAt)}
            {submission.reviewedAt && ` · direview ${formatDate(submission.reviewedAt)}`}
          </p>
        </div>
        <Badge status={submission.status} />
      </header>

      {submission.reviewNote && (
        <Card
          className={cn(
            submission.status === "approved"
              ? "border-success/30 bg-success-soft/50"
              : "border-danger/30 bg-danger-soft/50",
          )}
        >
          <CardContent className="flex gap-3">
            <IconMessageCircle
              size={16}
              className={cn(
                "mt-0.5 shrink-0",
                submission.status === "approved" ? "text-success-fg" : "text-danger-fg",
              )}
            />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide">
                Catatan reviewer
                {submission.reviewedBy && (
                  <span className="ml-1 font-normal normal-case text-on-surface-variant">
                    — {submission.reviewedBy}
                  </span>
                )}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-on-surface">
                {submission.reviewNote}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="min-w-0 overflow-hidden">
          <CardHeader className="border-b border-surface-line pb-3">
            <CardTitle className="flex items-center gap-2">
              <IconFileCode size={14} /> Berkas yang dikirim
            </CardTitle>
            <span className="font-mono text-[10px] text-on-surface-faint">
              {submission.files.length} berkas
            </span>
          </CardHeader>

          {submission.files.length === 0 ? (
            <CardContent>
              <p className="text-xs text-on-surface-variant">Tidak ada berkas.</p>
            </CardContent>
          ) : (
            <>
              <div className="flex flex-wrap gap-1 border-b border-surface-line bg-surface-sunken/50 p-2">
                {submission.files.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveFile(index)}
                    className={cn(
                      "cursor-pointer rounded-md px-2 py-1 font-mono text-[10px] font-semibold transition-colors",
                      index === activeFile
                        ? "bg-surface-raised text-on-surface shadow-subtle"
                        : "text-on-surface-variant hover:text-on-surface",
                    )}
                  >
                    {item.filename}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between border-b border-surface-line px-4 py-2">
                <span className="font-mono text-[10px] text-on-surface-faint">
                  {file.filename} · {formatBytes(file.sizeBytes)} · {file.mime}
                </span>
              </div>
              <pre className="max-h-[480px] overflow-auto bg-surface-sunken/60 p-4 font-mono text-[12px] leading-relaxed">
                {file.previewText ?? "Pratinjau tidak tersedia untuk berkas ini."}
              </pre>
            </>
          )}
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="border-b border-surface-line pb-3">
              <CardTitle className="flex items-center gap-2">
                <IconTerminal2 size={14} /> Output program
              </CardTitle>
            </CardHeader>
            <pre className="max-h-72 overflow-auto p-4 font-mono text-[12px] leading-relaxed text-on-surface">
              {submission.outputText}
            </pre>
          </Card>

          {submission.note && (
            <Card>
              <CardHeader className="border-b border-surface-line pb-3">
                <CardTitle>Catatan kamu</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <p className="text-xs leading-relaxed text-on-surface-variant">{submission.note}</p>
              </CardContent>
            </Card>
          )}

          <Card className="border-dashed bg-surface-sunken/40">
            <CardContent className="flex flex-col gap-2">
              <p className="text-[11px] font-bold">Alur review</p>
              <ol className="flex flex-col gap-1.5 text-[11px] leading-relaxed text-on-surface-variant">
                <li>1. Kamu kirim berkas + output.</li>
                <li>2. Reviewer membaca kode dan mencocokkan output.</li>
                <li>3. Disetujui → bab selesai. Perlu perbaikan → kirim ulang.</li>
              </ol>
              <Link
                to="/tracks/$trackSlug/$chapterSlug"
                params={{ trackSlug: submission.trackSlug, chapterSlug: submission.chapterSlug }}
                className="mt-1"
              >
                <Button size="sm" variant="outline" className="w-full">
                  Buka bab ini
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
