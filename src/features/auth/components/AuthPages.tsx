import { Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";
import { FormField } from "@/shared/ui/FormField";
import { Input } from "@/shared/ui/Input";
import { LogoMark } from "@/shared/ui/LogoMark";
import { useToast } from "@/shared/ui/Toast";

const DEMO_ACCOUNTS = [
  { email: "kiki@nolsatu.local", label: "Kiki", role: "Learner" },
  { email: "admin@nolsatu.local", label: "Chairil", role: "Admin" },
];

export function SignInPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = React.useState("kiki@nolsatu.local");
  const [password, setPassword] = React.useState("password");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await signIn(email, password);
      toast.success(`Selamat datang, ${user.displayName}.`);
      void navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Masuk"
      subtitle="Lanjutkan dari bab terakhir yang kamu tinggalkan."
      footer={
        <>
          Belum punya akun?{" "}
          <Link to="/register" className="font-bold text-primary hover:underline">
            Daftar gratis
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField label="Email" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="kamu@email.com"
            required
          />
        </FormField>
        <FormField label="Password" htmlFor="password" required>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="minimal 6 karakter"
            required
          />
        </FormField>
        {error && (
          <p className="rounded-[10px] border border-danger/25 bg-danger-soft px-3 py-2 text-[11px] font-medium text-danger-fg">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" loading={submitting}>
          Masuk
        </Button>
      </form>

      <div className="mt-6 border-t border-surface-line pt-4">
        <p className="eyebrow mb-2">Akun demo</p>
        <div className="flex flex-col gap-1.5">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => {
                setEmail(account.email);
                setPassword("password");
              }}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-[10px] border border-surface-line bg-surface-raised px-3 py-2 text-left transition-colors hover:border-on-surface-faint",
                email === account.email && "border-primary/40 bg-primary-soft/40",
              )}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-on-surface-variant">
                {account.role}
              </span>
              <span className="text-xs font-semibold">{account.label}</span>
              <span className="ml-auto font-mono text-[10px] text-on-surface-faint">
                {account.email}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-on-surface-faint">
          Password semua akun demo: <span className="font-mono">password</span>
        </p>
      </div>
    </AuthShell>
  );
}

export function RegisterPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const user = await signUp(name, email, password);
      toast.success(`Akun ${user.displayName} dibuat. Mulai dari Bab 1.`);
      void navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mendaftar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Daftar gratis"
      subtitle="Tidak perlu kartu kredit. Tidak ada masa trial."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link to="/signin" className="font-bold text-primary hover:underline">
            Masuk
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField label="Nama panggilan" htmlFor="name" required hint="Dipakai di dashboard.">
          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Kiki"
            autoComplete="nickname"
            required
          />
        </FormField>
        <FormField label="Email" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="kamu@email.com"
            autoComplete="email"
            required
          />
        </FormField>
        <FormField label="Password" htmlFor="password" required hint="Minimal 6 karakter.">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="minimal 6 karakter"
            autoComplete="new-password"
            required
          />
        </FormField>
        {error && (
          <p className="rounded-[10px] rounded-[10px] border border-danger/25 bg-danger-soft px-3 py-2 text-[11px] font-medium text-danger-fg">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" loading={submitting}>
          Buat akun
        </Button>
        <p className="text-[10px] leading-relaxed text-on-surface-faint">
          Dengan mendaftar, kamu setuju bahwa latihan dikerjakan sendiri dan bukti yang dikirim akan
          diperiksa manual.
        </p>
      </form>
    </AuthShell>
  );
}

function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[1fr_1.05fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-surface-line bg-surface-sunken p-10 lg:flex">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-on-primary">
              <LogoMark className="size-4" />
            </span>
            <span className="text-sm font-extrabold tracking-tight">NolSatu</span>
          </Link>
        </div>
        <div className="relative max-w-sm">
          <p className="font-mono text-[11px] text-on-surface-faint">0 → 1</p>
          <p className="mt-3 text-2xl font-extrabold leading-snug tracking-tight">
            “Error itu normal. Yang tidak normal adalah berhenti karena error.”
          </p>
          <p className="mt-3 text-xs leading-relaxed text-on-surface-variant">
            Materi NolSatu ditulis dengan asumsi kamu belum pernah menulis satu baris kode pun.
            Tidak ada istilah yang dilempar tanpa dijelaskan.
          </p>
        </div>
        <div className="relative flex flex-col gap-2 border-t border-surface-line pt-6">
          {[
            "10 bab Java siap dipakai",
            "Review manual, bukan klik selesai",
            "Tanpa AI, tanpa eksekusi server",
          ].map((line) => (
            <p
              key={line}
              className="font-mono text-[10px] uppercase tracking-wide text-on-surface-faint"
            >
              {line}
            </p>
          ))}
        </div>
      </aside>

      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-md bg-primary text-on-primary">
                <LogoMark className="size-4" />
              </span>
              <span className="text-sm font-extrabold tracking-tight">NolSatu</span>
            </Link>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-xs text-on-surface-variant">{subtitle}</p>
          <div className="mt-7">{children}</div>
          <p className="mt-6 border-t border-surface-line pt-4 text-center text-[11px] text-on-surface-variant">
            {footer}
          </p>
        </div>
      </main>
    </div>
  );
}
