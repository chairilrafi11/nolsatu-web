import { IconArrowRight, IconFileCheck, IconFilter } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import * as React from "react";

import { useMySubmissions } from "@/lib/api/queries";
import type { SubmissionStatus } from "@/lib/api/types";
import { formatDate } from "@/lib/format";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Tabs } from "@/shared/ui/Tabs";

type Filter = "all" | SubmissionStatus;

export function SubmissionsPage() {
  const submissions = useMySubmissions();
  const [filter, setFilter] = React.useState<Filter>("all");

  const counts = React.useMemo(
    () => ({
      all: submissions.length,
      pending: submissions.filter((item) => item.status === "pending").length,
      approved: submissions.filter((item) => item.status === "approved").length,
      rejected: submissions.filter((item) => item.status === "rejected").length,
    }),
    [submissions],
  );

  const visible =
    filter === "all" ? submissions : submissions.filter((item) => item.status === filter);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Bukti belajar</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Submission</h1>
          <p className="mt-1 max-w-lg text-xs leading-relaxed text-on-surface-variant">
            Semua latihan yang kamu kirim. Submission berstatus “disetujui” yang membuat bab
            dihitung selesai.
          </p>
        </div>
        <Link to="/tracks">
          <Button variant="outline" size="sm">
            <IconFilter size={14} /> Pilih bab
          </Button>
        </Link>
      </header>

      <Tabs
        value={filter}
        onChange={(value) => setFilter(value as Filter)}
        items={[
          { value: "all", label: "Semua", count: counts.all },
          { value: "pending", label: "Menunggu", count: counts.pending },
          { value: "approved", label: "Disetujui", count: counts.approved },
          { value: "rejected", label: "Perbaikan", count: counts.rejected },
        ]}
      />

      {visible.length === 0 ? (
        <Card>
          <EmptyState
            icon={<IconFileCheck size={18} />}
            title={filter === "all" ? "Belum ada submission" : "Tidak ada submission di filter ini"}
            description={
              filter === "all"
                ? "Selesaikan satu bab, jalankan latihannya di VS Code, lalu kirim buktinya."
                : "Coba pilih filter lain."
            }
            action={
              filter === "all" ? (
                <Link to="/tracks">
                  <Button size="sm">Buka track</Button>
                </Link>
              ) : undefined
            }
          />
        </Card>
      ) : (
        <Card className="divide-y divide-surface-line">
          {visible.map((submission) => (
            <Link
              key={submission.id}
              to="/submissions/$submissionId"
              params={{ submissionId: submission.id }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 transition-colors hover:bg-surface-sunken/50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-bold">{submission.chapterTitle}</p>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                    {submission.trackSlug}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 font-mono text-[10px] text-on-surface-faint">
                  {submission.files.map((file) => file.filename).join(" · ") || "tanpa berkas"}
                </p>
              </div>
              <div className="text-right">
                <Badge status={submission.status} />
                <p className="mt-1 font-mono text-[10px] text-on-surface-faint">
                  {formatDate(submission.createdAt)}
                </p>
              </div>
              <IconArrowRight size={13} className="shrink-0 text-on-surface-faint" />
            </Link>
          ))}
        </Card>
      )}
    </div>
  );
}
