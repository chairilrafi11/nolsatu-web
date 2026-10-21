# Bab 10 — Rekap & Next Steps

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Melihat seluruh konsep yang sudah dipelajari dalam satu aplikasi utuh
- Menjelaskan arah selanjutnya: API, routing, auth

## 🎮 Analogi Mobile Legends

Kamu sudah menyelesaikan "rank placement". Sekarang naik ke rank berikutnya.

Dashboard CRUD kamu sudah **lengkap dan berfungsi**. Dari sini, langkah berikutnya menuju dunia frontend yang lebih luas.

## 📖 Materi

### 1. Rekap — yang sudah kamu kuasai

| Bab | Konsep | Ringkasan |
|-----|--------|-----------|
| 1 | Vite + TS + Tailwind | Setup projek, struktur folder |
| 2 | JSX & component & props | UI dari komponen yang dipakai ulang |
| 3 | State (`useState`) & event | Data yang berubah → tampilan ikut berubah |
| 4 | Render list (`map`) | Array → tampilan |
| 5 | Tailwind | Styling cepat |
| 6 | CREATE | Form + `[...arr, baru]` |
| 7 | DELETE | `filter` |
| 8 | UPDATE | `map` + ganti item yang cocok |
| 9 | localStorage + `useEffect` | Data persisten |

**Pola-pola inti React yang kamu pakai berulang:**

1. **Controlled input**: `value={...}` + `onChange={(e) => set...(e.target.value)}`
2. **Jangan ubah state langsung**: selalu set dengan array/object baru
3. **Kondisi di JSX**: `{kondisi ? a : b}` dan `{kondisi && <X/>}`
4. **`key` unik** di tiap item list
5. **Handler berargumen**: `onClick={() => fn(arg)}`

### 2. Proyek final yang disarankan

Kalau ingin latihan mandiri, buat aplikasi **"Daftar Skill Kuliah"** dengan pola yang sama:
- Daftar mata kuliah (kode, nama, SKS, semester)
- CRUD penuh + localStorage
- Bonus: filter tampilkan hanya mata kuliah semester tertentu

### 3. Next steps — arah ke depan

Setelah dashboard ini, dunia frontend makin luas. Urutan belajar yang disarankan:

**1. React Router (halaman jamak)**
Dashboard → halaman Detail, halaman Login terpisah.

```bash
npm install react-router-dom
```

**2. Komponen lebih dalam**
- `useEffect` untuk data dari server
- Context (state global antar halaman)
- Props drilling & lifting state

**3. API sungguhan**
Konsep yang sama dengan CRUD sekarang, tapi data dari **backend**:

```ts
// contoh: baca data dari API
const resp = await fetch('/api/mahasiswa')
const data = await resp.json()
```

- Paham bedanya: sekarang data di localStorage (di sisi user) → nanti data di database server
- Lanjut ke course **backend** (Java Spring Boot, atau Node.js) — dan data bisa dibagi antar pengguna

**4. Polishing**
- Form validation
- Loading state
- Error handling
- Deploy ke Vercel/Netlify (supaya bisa dibuka orang lain)

### 4. Tips supaya makin jago

- **Baca error** — React & TypeScript memberi tahu lokasi masalah dengan jelas
- **Perhatikan warning di console** (F12) — sering isyarat bug tersembunyi
- **Bangun sesuatu**: aplikasi apa pun yang kamu pakai sehari-hari, coba tiru versi sederhananya
- **Refactor**: pisahkan komponen jadi file terpisah, jangan semua di `App.tsx`

---

## 🏆 Selamat!

Kamu sudah menyelesaikan course React + Vite dan punya **dashboard CRUD yang berfungsi penuh** — fondasi yang sama dengan aplikasi admin di dunia kerja.

Konsep yang dipakai di sini (component, state, props, CRUD, localStorage) adalah **80% yang dipakai tiap hari** oleh frontend developer. Kamu sudah melewati bagian tersulit.

Next: pilih arah — backend (Java Spring Boot) buat jadi full stack, atau perdalam React (router + API). Semangat! 🎉
