import {
  IconArrowRight,
  IconBook2,
  IconBrandGithub,
  IconCheck,
  IconCode,
  IconDeviceLaptop,
  IconFileUpload,
  IconTerminal2,
  IconUsers,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useTrackList } from "@/lib/api/queries";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { LogoMark } from "@/shared/ui/LogoMark";

const STEPS = [
  {
    icon: IconBook2,
    title: "Baca satu bab",
    body: "Analogi dulu, baru materi. Setiap bab selesai dalam sekali duduk.",
  },
  {
    icon: IconDeviceLaptop,
    title: "Ketik & jalankan sendiri",
    body: "Buka VS Code, ketik ulang contohnya, jalankan. Bukan copy-paste.",
  },
  {
    icon: IconFileUpload,
    title: "Upload bukti",
    body: "Kirim berkas dan tempel output program. Kamu dapat catatan dari reviewer.",
  },
];

const PRINCIPLES = [
  "Tidak ada AI yang mengerjakan PR-mu. Kamu yang mengetik, kamu yang paham.",
  "Tidak ada kode yang dijalankan di server. Semua jalan di komputermu sendiri.",
  "Progres hanya naik setelah bukti latihan diperiksa, bukan setelah klik selesai.",
];

export function LandingPage() {
  const tracks = useTrackList();

  return (
    <div className="min-h-[100dvh] bg-surface">
      <header className="sticky top-0 z-40 border-b border-surface-line bg-surface/85 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-on-primary">
              <LogoMark className="size-4" />
            </span>
            <span className="text-sm font-extrabold tracking-tight">NolSatu</span>
          </Link>
          <span className="eyebrow ml-1 hidden sm:inline">belajar dari nol</span>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Daftar gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-surface-line">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-[0.55]" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--surface)_20%,transparent_70%)]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:py-24">
            <p className="eyebrow">Pemrograman · dari nol</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] text-on-surface sm:text-5xl lg:text-6xl">
              Belajar ngoding tanpa
              <span className="text-primary"> pura-pura paham.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
              NolSatu adalah course pemrograman untuk orang yang benar-benar belum pernah menulis
              kode. Satu bab, satu konsep, satu latihan. Kamu kerjakan sendiri di laptopmu, lalu
              kirim buktinya untuk diperiksa.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/register">
                <Button size="lg">
                  Mulai dari Bab 1
                  <IconArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/tracks">
                <Button variant="outline" size="lg">
                  Lihat kurikulum
                </Button>
              </Link>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-surface-line pt-8 sm:grid-cols-4">
              {[
                {
                  label: "Bab Java",
                  value: tracks.find((t) => t.track.slug === "java")?.totalCount ?? 10,
                },
                {
                  label: "Track berjalan",
                  value: tracks.filter((t) => t.track.status === "live").length,
                },
                { label: "Biaya", value: "0" },
                { label: "AI dipakai", value: "0" },
              ].map((item) => (
                <div key={item.label}>
                  <dd className="font-mono text-2xl font-bold tabular tracking-tight">
                    {item.value}
                  </dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-wide text-on-surface-faint">
                    {item.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-surface-line">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <p className="eyebrow">Cara kerjanya</p>
            <h2 className="mt-3 max-w-xl text-2xl font-extrabold tracking-tight sm:text-3xl">
              Tiga langkah, diulang sampai selesai.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {STEPS.map((step, index) => (
                <div
                  key={step.title}
                  className="relative rounded-[14px] border border-surface-line bg-surface-raised p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-[10px] border border-surface-line bg-surface-sunken text-primary">
                      <step.icon size={17} />
                    </span>
                    <span className="font-mono text-[11px] text-on-surface-faint">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-surface-line bg-surface-sunken/40">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="eyebrow">Kenapa beda</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Pendirian yang tidak kami tawar.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-on-surface-variant">
                Banyak tempat belajar mengajarkan cara menempel prompt. NolSatu mengajarkan cara
                membaca kode yang kamu tulis sendiri, karena itu satu-satunya bekal yang bertahan
                saat alatnya berganti.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {PRINCIPLES.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 rounded-[14px] border border-surface-line bg-surface-raised p-4"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft">
                    <IconCheck size={12} stroke={3} />
                  </span>
                  <p className="text-xs leading-relaxed text-on-surface">{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">Kurikulum</p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Mulai dari mana.
                </h2>
              </div>
              <Link
                to="/tracks"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
              >
                Semua track
                <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {tracks.map(({ track }) => (
                <Link
                  key={track.slug}
                  to="/tracks/$trackSlug"
                  params={{ trackSlug: track.slug }}
                  className="group flex flex-col rounded-[14px] border border-surface-line bg-surface-raised p-5 transition-colors hover:border-on-surface-faint"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-md border border-surface-line bg-surface-sunken font-mono text-[10px] font-bold uppercase text-on-surface-variant">
                      {track.language === "java" ? "Jv" : track.language === "c" ? "C" : "Re"}
                    </span>
                    <h3 className="text-sm font-bold">{track.title}</h3>
                    <Badge status={track.status} className="ml-auto" />
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-on-surface-variant">
                    {track.tagline}
                  </p>
                  <div className="mt-4 flex items-center gap-4 border-t border-surface-line pt-3 font-mono text-[10px] uppercase tracking-wide text-on-surface-faint">
                    <span>{track.chapterCount} bab</span>
                    <span>±{track.estimatedHours} jam</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      buka <IconArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-surface-line bg-surface-sunken/40">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Siap menulis baris pertama?
              </h2>
              <p className="mt-1.5 text-sm text-on-surface-variant">
                Tidak perlu pengalaman. Tidak perlu kartu kredit. Cukup laptop dan VS Code.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Link to="/register">
                <Button size="lg">Daftar gratis</Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" size="lg">
                  Sudah punya akun
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-surface-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-on-primary">
              <LogoMark className="size-3.5" />
            </span>
            <span className="text-xs font-bold">NolSatu</span>
          </div>
          <p className="text-[11px] text-on-surface-faint">
            Course pemrograman gratis. Dibuat untuk yang benar-benar mulai dari nol.
          </p>
          <div className="flex items-center gap-3 text-on-surface-faint sm:ml-auto">
            <a href="https://opencode.ai" className="hover:text-on-surface" aria-label="OpenCode">
              <IconCode size={15} />
            </a>
            <a href="https://github.com" className="hover:text-on-surface" aria-label="GitHub">
              <IconBrandGithub size={15} />
            </a>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px]">
              <IconUsers size={12} /> terbuka
            </span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px]">
              <IconTerminal2 size={12} /> code-first
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
