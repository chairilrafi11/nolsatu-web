# NolSatu Web

Frontend NolSatu — React 19 · Vite 6 · TypeScript · Tailwind v4 · TanStack Router/Query · Bun.

Saat ini berjalan **mode mock**: semua data (termasuk materi) dibaca dari `content/` di repo ini dan
`localStorage`. Backend ada di repo terpisah `nolsatu-api`; kontrak API dikunci setelah desain dipoles.

## Menjalankan

Dari root project:

```bash
make install
make dev          # http://localhost:3171
```

Atau langsung:

```bash
cd nolsatu-web
bun install
bun run dev
```

## Akun demo

| Email | Password | Role |
|---|---|---|
| `kiki@nolsatu.local` | `password` | learner |
| `admin@nolsatu.local` | `password` | admin |

Semua akun seed memakai password `password`. Registrasi baru juga berfungsi (disimpan lokal).

## Struktur

```
src/
├── app/            providers.tsx, router.tsx
├── features/       auth, home, tracks, chapter, submissions, admin
├── content/        java/, c/, react/ (materi markdown)
├── layout/         AppLayout
├── lib/
│   ├── api/        types.ts (kanonik), queries.ts (seam), source.ts
│   ├── mock/       content.ts (loader markdown), store.ts (state + seed)
│   ├── theme/      ThemeProvider (light/dark/system)
│   └── format.ts
├── shared/         lib/cn, status/statusColors, ui/* (SSoT)
└── styles/globals.css
```

## Gate

```bash
bun run lint && bun run typecheck && bun run build
```

## Catatan

- Jangan memanggil `lib/mock/store.ts` dari komponen; gunakan `lib/api/queries.ts`.
- Tipe kanonik hanya di `lib/api/types.ts`.
- Halaman baca materi: `content/<track>/bab/NN-slug.md`.
