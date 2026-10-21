import { IconPaperclip, IconX } from "@tabler/icons-react";
import * as React from "react";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { actions } from "@/lib/api/queries";
import type { CreateSubmissionInput, User } from "@/lib/api/types";
import { LIMITS } from "@/lib/api/types";
import { formatBytes } from "@/lib/format";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";
import { FormField } from "@/shared/ui/FormField";
import { Textarea } from "@/shared/ui/Textarea";
import { useToast } from "@/shared/ui/Toast";

interface PickedFile {
  filename: string;
  sizeBytes: number;
  mime: string;
  text: string;
}

function extensionOf(name: string): string {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index).toLowerCase() : "";
}

export function SubmissionForm({
  trackSlug,
  chapterSlug,
  onSubmitted,
}: {
  trackSlug: string;
  chapterSlug: string;
  onSubmitted: (submissionId: string) => void;
}) {
  const { user } = useAuth();
  const toast = useToast();
  const [outputText, setOutputText] = React.useState("");
  const [note, setNote] = React.useState("");
  const [files, setFiles] = React.useState<PickedFile[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function pickFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (selected.length === 0) return;

    setError(null);
    const next: PickedFile[] = [];
    for (const file of selected) {
      if (files.length + next.length >= LIMITS.maxFiles) {
        setError(`Maksimal ${LIMITS.maxFiles} berkas per submission.`);
        break;
      }
      if (file.size > LIMITS.maxFileBytes) {
        setError(`${file.name} terlalu besar (maks 5 MB per berkas).`);
        continue;
      }
      const extension = extensionOf(file.name);
      if (
        !LIMITS.allowedExtensions.includes(extension as (typeof LIMITS.allowedExtensions)[number])
      ) {
        setError(`${file.name}: ekstensi ${extension || "(tanpa ekstensi)"} tidak diizinkan.`);
        continue;
      }
      if (file.size > 512 * 1024) {
        setError(
          `${file.name} terlalu besar untuk dibaca di browser pada mode demo (maks 512 KB).`,
        );
        continue;
      }
      const text = await file.text();
      next.push({
        filename: file.name,
        sizeBytes: file.size,
        mime: file.type || "text/plain",
        text,
      });
    }
    if (next.length > 0) setFiles((current) => [...current, ...next]);
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;
    setError(null);

    if (files.length === 0) {
      setError("Lampirkan berkas kode kamu (mis. Main.java).");
      return;
    }
    if (!outputText.trim()) {
      setError("Tempel output program dari terminal.");
      return;
    }
    if (outputText.length > LIMITS.maxOutputChars) {
      setError(`Output terlalu panjang (maks ${LIMITS.maxOutputChars} karakter).`);
      return;
    }

    setSubmitting(true);
    try {
      const input: CreateSubmissionInput = {
        trackSlug,
        chapterSlug,
        outputText,
        note,
        files: files.map((file) => ({
          filename: file.filename,
          sizeBytes: file.sizeBytes,
          mime: file.mime,
          text: file.text,
        })),
      };
      const created = actions.createSubmission(user as User, input);
      toast.success("Submission terkirim. Menunggu review.");
      setFiles([]);
      setOutputText("");
      setNote("");
      onSubmitted(created.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim submission.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormField
        label="Berkas kode"
        required
        hint={`Maks ${LIMITS.maxFiles} berkas · 5 MB · .java .c .h .txt .md`}
      >
        <div className="flex flex-col gap-2">
          {files.map((file) => (
            <div
              key={file.filename}
              className="flex items-center gap-2 rounded-[10px] border border-surface-line bg-surface-raised px-3 py-2"
            >
              <IconPaperclip size={13} className="shrink-0 text-on-surface-faint" />
              <span className="min-w-0 flex-1 truncate font-mono text-[11px]">{file.filename}</span>
              <span className="font-mono text-[10px] text-on-surface-faint">
                {formatBytes(file.sizeBytes)}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFiles((current) => current.filter((item) => item.filename !== file.filename))
                }
                className="cursor-pointer rounded p-0.5 text-on-surface-faint hover:text-danger-fg"
                aria-label={`Hapus ${file.filename}`}
              >
                <IconX size={13} />
              </button>
            </div>
          ))}

          <input
            ref={inputRef}
            type="file"
            multiple
            accept={LIMITS.allowedExtensions.join(",")}
            onChange={(event) => void pickFiles(event)}
            className="sr-only"
            id="submission-files"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-dashed border-surface-line-strong px-3 py-3 text-[11px] font-semibold text-on-surface-variant transition-colors hover:border-primary hover:text-primary",
            )}
          >
            <IconPaperclip size={14} />
            Pilih berkas dari laptop
          </button>
        </div>
      </FormField>

      <FormField
        label="Output program"
        required
        htmlFor="submission-output"
        hint="Salin seluruh isi terminal setelah program dijalankan."
      >
        <Textarea
          id="submission-output"
          value={outputText}
          onChange={(event) => setOutputText(event.target.value)}
          placeholder={"Selamat datang di NolSatu!\nPilih track yang mau kamu pelajari."}
          rows={7}
        />
        <div className="flex justify-end">
          <span
            className={cn(
              "font-mono text-[10px] tabular",
              outputText.length > LIMITS.maxOutputChars
                ? "text-danger-fg"
                : "text-on-surface-faint",
            )}
          >
            {outputText.length}/{LIMITS.maxOutputChars}
          </span>
        </div>
      </FormField>

      <FormField
        label="Catatan (opsional)"
        htmlFor="submission-note"
        hint="Kalau ada bagian yang bikin bingung, tulis di sini."
      >
        <Textarea
          id="submission-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Scanner-nya sempat error, sudah saya perbaiki."
          rows={3}
          className="font-sans text-[13px]"
          maxLength={LIMITS.maxNoteChars}
        />
      </FormField>

      {error && (
        <p className="rounded-[10px] border border-danger/25 bg-danger-soft px-3 py-2 text-[11px] font-medium text-danger-fg">
          {error}
        </p>
      )}

      <Button type="submit" loading={submitting}>
        Kirim untuk direview
      </Button>
      <p className="text-center text-[10px] leading-relaxed text-on-surface-faint">
        Ini mode demo: berkas dibaca di browser dan disimpan lokal. Setelah API aktif, berkas
        diunggah ke storage privat.
      </p>
    </form>
  );
}
