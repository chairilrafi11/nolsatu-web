import {
  IconCheck,
  IconChevronRight,
  IconFileCode,
  IconInbox,
  IconMessageCircle,
  IconTerminal2,
  IconX,
} from "@tabler/icons-react";
import * as React from "react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { actions, useAllSubmissions } from "@/lib/api/queries";
import type { Submission, SubmissionStatus } from "@/lib/api/types";
import { LIMITS } from "@/lib/api/types";
import { formatBytes, formatDate } from "@/lib/format";
import { cn } from "@/shared/lib/cn";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { FormField } from "@/shared/ui/FormField";
import { Modal } from "@/shared/ui/Modal";
import { Tabs } from "@/shared/ui/Tabs";
import { Textarea } from "@/shared/ui/Textarea";
import { useToast } from "@/shared/ui/Toast";

type Filter = "pending" | "approved" | "rejected" | "all";

export function AdminReviewPage() {
  const submissions = useAllSubmissions();
  const [filter, setFilter] = React.useState<Filter>("pending");
  const [selected, setSelected] = React.useState<Submission | null>(null);

  const counts = React.useMemo(
    () => ({
      pending: submissions.filter((item) => item.status === "pending").length,
      approved: submissions.filter((item) => item.status === "approved").length,
      rejected: submissions.filter((item) => item.status === "rejected").length,
      all: submissions.length,
    }),
    [submissions],
  );

  const visible =
    filter === "all" ? submissions : submissions.filter((item) => item.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Antrean review</h1>
        <p className="mt-1 max-w-xl text-xs leading-relaxed text-on-surface-variant">
          Periksa berkas dan output, lalu setujui atau minta perbaikan. Setiap keputusan butuh
          alasan yang bisa dibaca user.
        </p>
      </header>

      <Tabs
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
        items={[
          { value: "pending", label: "Menunggu", count: counts.pending },
          { value: "approved", label: "Disetujui", count: counts.approved },
          { value: "rejected", label: "Ditolak", count: counts.rejected },
          { value: "all", label: "Semua", count: counts.all },
        ]}
      />

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            icon={<IconInbox size={18} />}
            title={filter === "pending" ? "Antrean kosong" : "Tidak ada data"}
            description={
              filter === "pending"
                ? "Tidak ada submission yang menunggu. Semua sudah diperiksa."
                : "Coba filter lain."
            }
          />
        </Card>
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((submission) => (
            <button
              key={submission.id}
              type="button"
              onClick={() => setSelected(submission)}
              className="group flex cursor-pointer flex-wrap items-start gap-3 rounded-[14px] border border-surface-line bg-surface-raised p-4 text-left transition-colors hover:border-on-surface-faint"
            >
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-surface-line bg-surface-sunken text-on-surface-variant">
                <IconFileCode size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-bold">{submission.chapterTitle}</p>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                    {submission.trackSlug}
                  </span>
                  <Badge status={submission.status} className="ml-auto" />
                </div>
                <p className="mt-1 text-[11px] text-on-surface-variant">
                  {submission.userDisplayName} · {submission.userEmail}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-on-surface-faint">
                  {formatDate(submission.createdAt)} ·{" "}
                  {submission.files.map((file) => file.filename).join(", ") || "tanpa berkas"}
                </p>
              </div>
              <IconChevronRight
                size={14}
                className="mt-2 shrink-0 text-on-surface-faint transition-transform group-hover:translate-x-0.5"
              />
            </button>
          ))}
        </div>
      )}

      {selected && (
        <ReviewModal
          submission={selected}
          onClose={() => setSelected(null)}
          onDone={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function ReviewModal({
  submission,
  onClose,
  onDone,
}: {
  submission: Submission;
  onClose: () => void;
  onDone: () => void;
}) {
  const { user } = useAuth();
  const toast = useToast();
  const [reviewNote, setReviewNote] = React.useState(submission.reviewNote ?? "");
  const [error, setError] = React.useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = React.useState<Exclude<
    SubmissionStatus,
    "pending"
  > | null>(null);
  const [activeFile, setActiveFile] = React.useState(0);

  const file = submission.files[activeFile] ?? submission.files[0];
  const locked = submission.status !== "pending";

  function decide(status: Exclude<SubmissionStatus, "pending">) {
    if (!user) return;
    setError(null);
    setPendingStatus(status);
  }

  function confirm() {
    if (!user || !pendingStatus) return;
    try {
      actions.reviewSubmission(submission.id, user, {
        status: pendingStatus,
        reviewNote,
      });
      toast.success(
        pendingStatus === "approved"
          ? "Submission disetujui."
          : "Submission dikembalikan untuk perbaikan.",
      );
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan review.");
      setPendingStatus(null);
    }
  }

  return (
    <>
      <Modal
        open
        onClose={onClose}
        title={`${submission.chapterTitle} — ${submission.userDisplayName}`}
        description={`${submission.trackSlug} · ${submission.chapterSlug} · dikirim ${formatDate(submission.createdAt)}`}
        className="max-w-3xl"
        footer={
          locked ? (
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button variant="danger" onClick={() => decide("rejected")}>
                <IconX size={14} /> Minta perbaikan
              </Button>
              <Button onClick={() => decide("approved")}>
                <IconCheck size={14} /> Setujui
              </Button>
            </>
          )
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge status={submission.status} />
            {submission.reviewedBy && (
              <span className="font-mono text-[10px] text-on-surface-faint">
                direview {submission.reviewedBy}
              </span>
            )}
          </div>

          <div className="rounded-[10px] border border-surface-line bg-surface-sunken/50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <IconTerminal2 size={13} className="text-on-surface-faint" />
              <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface-faint">
                Output
              </span>
            </div>
            <pre className="max-h-48 overflow-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed">
              {submission.outputText}
            </pre>
          </div>

          {submission.note && (
            <div className="rounded-[10px] border border-surface-line p-3">
              <div className="mb-1 flex items-center gap-1.5">
                <IconMessageCircle size={13} className="text-on-surface-faint" />
                <span className="text-[10px] font-bold uppercase tracking-wide text-on-surface-faint">
                  Catatan user
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                {submission.note}
              </p>
            </div>
          )}

          {submission.files.length > 0 && (
            <div className="overflow-hidden rounded-[10px] border border-surface-line">
              <div className="flex flex-wrap items-center gap-1 border-b border-surface-line bg-surface-sunken/50 p-2">
                {submission.files.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveFile(index)}
                    className={cn(
                      "cursor-pointer rounded px-2 py-1 font-mono text-[10px] font-semibold",
                      index === activeFile
                        ? "bg-surface-raised text-on-surface shadow-subtle"
                        : "text-on-surface-variant hover:text-on-surface",
                    )}
                  >
                    {item.filename}
                  </button>
                ))}
                <span className="ml-auto font-mono text-[10px] text-on-surface-faint">
                  {file ? formatBytes(file.sizeBytes) : ""}
                </span>
              </div>
              <pre className="max-h-72 overflow-auto bg-surface-sunken/40 p-3 font-mono text-[11px] leading-relaxed">
                {file?.previewText ?? "Pratinjau tidak tersedia."}
              </pre>
            </div>
          )}

          <FormField
            label={locked ? "Catatan review" : "Catatan review"}
            htmlFor="review-note"
            hint={
              locked
                ? "Submission sudah direview; catatan tidak bisa diubah."
                : "Wajib diisi saat meminta perbaikan. Sebutkan bagian yang salah dan apa yang diharapkan."
            }
          >
            <Textarea
              id="review-note"
              value={reviewNote}
              onChange={(event) => setReviewNote(event.target.value)}
              rows={3}
              placeholder="Output belum sesuai: bagian akhir harus menampilkan total, bukan daftar."
              maxLength={LIMITS.maxReviewNoteChars}
              disabled={locked}
              className="font-sans text-[13px]"
            />
          </FormField>

          {error && (
            <p className="rounded-[10px] border border-danger/25 bg-danger-soft px-3 py-2 text-[11px] font-medium text-danger-fg">
              {error}
            </p>
          )}
        </div>
      </Modal>

      <Modal
        open={pendingStatus !== null}
        onClose={() => setPendingStatus(null)}
        title={pendingStatus === "approved" ? "Setujui submission ini?" : "Minta perbaikan?"}
        description={
          pendingStatus === "approved"
            ? "Bab ini akan dihitung selesai untuk user tersebut."
            : "User akan melihat catatanmu dan bisa mengirim ulang."
        }
        footer={
          <>
            <Button variant="outline" onClick={() => setPendingStatus(null)}>
              Batal
            </Button>
            <Button variant={pendingStatus === "approved" ? "primary" : "danger"} onClick={confirm}>
              Konfirmasi
            </Button>
          </>
        }
      >
        <Card className="bg-surface-sunken/50 shadow-none">
          <CardContent className="p-4">
            <p className="text-xs font-semibold">{submission.chapterTitle}</p>
            <p className="mt-1 text-[11px] text-on-surface-variant">
              {submission.userDisplayName} · {submission.files.length} berkas
            </p>
            {reviewNote.trim() && (
              <p className="mt-3 border-t border-surface-line pt-3 text-[11px] italic text-on-surface-variant">
                “{reviewNote.trim()}”
              </p>
            )}
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}
