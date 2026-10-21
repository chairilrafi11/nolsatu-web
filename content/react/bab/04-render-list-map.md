# Bab 4 — Render List dengan `map`

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menampilkan daftar data dengan `map`
- Menampilkan data mahasiswa di dalam tabel

## 🎮 Analogi Mobile Legends

Pikirkan layar **"Choose Hero"** di Mobile Legends. Game menampilkan **ratusan hero** dalam grid. Apakah game menulis satu `<div>` untuk tiap hero? Tentu tidak — game punya array berisi semua hero, lalu **mengulang** render untuk tiap elemen.

Di React, "mengulang render" itu pakai method `.map()` dari JavaScript.

> `map` = "untuk setiap item di array, buat tampilan". Persis `for` + array di course Java!

## 📖 Materi

### 1. `.map()` di JavaScript

`map` membuat **array baru** dari array lama — tiap elemen diproses oleh fungsi:

```ts
const angka = [1, 2, 3]
const kaliDua = angka.map((n) => n * 2)
// kaliDua = [2, 4, 6]
```

- `n` = tiap elemen (dipanggil sekali per elemen)
- `n * 2` = hasil proses elemen itu

### 2. `map` untuk render JSX

Ini pola inti React: array data → `map` → array JSX.

```tsx
const heroes = ["Layla", "Balmond", "Gusion"]

function App() {
  return (
    <ul>
      {heroes.map((hero) => (
        <li>{hero}</li>
      ))}
    </ul>
  )
}
```

Hasil:

```html
<ul>
  <li>Layla</li>
  <li>Balmond</li>
  <li>Gusion</li>
</ul>
```

> Perhatikan: `heroes.map(...)` ditulis di dalam `{ }` — karena itulah kode JavaScript.

### 3. Prop `key` — Wajib!

React butuh cara mengenali tiap item. Kasih prop `key` dengan nilai yang unik:

```tsx
{heroes.map((hero) => (
  <li key={hero}>{hero}</li>
))}
```

Kalau lupa `key`, muncul warning kuning di console. Nilai `key` harus **unik** per item — id paling cocok.

### 4. Tabel mahasiswa dari data

Sekarang kita pakai interface `Mahasiswa` (dari Bab 2) dan render tabel.

**`src/types.ts`:**

```ts
export interface Mahasiswa {
  id: number
  nama: string
  nim: string
  jurusan: string
  angkatan: number
}
```

**`src/App.tsx`:**

```tsx
import { useState } from 'react'
import type { Mahasiswa } from './types'

const dataAwal: Mahasiswa[] = [
  { id: 1, nama: "Budi Santoso", nim: "230001", jurusan: "Sistem Informasi", angkatan: 2023 },
  { id: 2, nama: "Sari Indah", nim: "230002", jurusan: "Teknik Informatika", angkatan: 2023 },
  { id: 3, nama: "Rizky Pratama", nim: "230003", jurusan: "Manajemen", angkatan: 2024 },
]

function App() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>(dataAwal)

  return (
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>NIM</th>
          <th>Jurusan</th>
          <th>Angkatan</th>
        </tr>
      </thead>
      <tbody>
        {mahasiswa.map((m) => (
          <tr key={m.id}>
            <td>{m.nama}</td>
            <td>{m.nim}</td>
            <td>{m.jurusan}</td>
            <td>{m.angkatan}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default App
```

Bedah bagian penting:

```tsx
const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>(dataAwal)
```

State `mahasiswa` berisi array `Mahasiswa`. Mulai dari `dataAwal`. `setMahasiswa` kita pakai mulai bab 6 untuk menambah/menghapus.

```tsx
{mahasiswa.map((m) => (
  <tr key={m.id}>...
))}
```

Satu `<tr>` (baris tabel) untuk tiap mahasiswa. `m` = satu mahasiswa.

> Penamaan: `m` atau `item` atau `data` bebas — selama konsisten. Yang penting di dalam `{ }` kamu bisa baca propertinya.

### 5. Kondisi saat array kosong

Belum ada data? Tampilkan pesan:

```tsx
{mahasiswa.length === 0 ? (
  <tr><td colSpan={4}>Belum ada data.</td></tr>
) : (
  mahasiswa.map((m) => (
    <tr key={m.id}>...</tr>
  ))
)}
```

Ini **conditional rendering** — tampilkan yang berbeda tergantung kondisi (ingat `if/else` di course Java?).

## 💪 Latihan

### Soal 1
Tambahkan 2 data mahasiswa baru ke `dataAwal` (id 4 dan 5), lalu lihat tabel bertambah.

### Soal 2
Ubah tabel: hapus kolom "Angkatan", ganti dengan kolom "Email". Tambahkan field `email` di interface `Mahasiswa` (di `types.ts`) dan isi semua data dengan email (misal `budi@gmail.com`).

### Soal 3
Di bawah tabel, tampilkan teks: "Total mahasiswa: X" (pakai `mahasiswa.length`).

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```tsx
const dataAwal: Mahasiswa[] = [
  { id: 1, nama: "Budi Santoso", nim: "230001", jurusan: "Sistem Informasi", angkatan: 2023 },
  { id: 2, nama: "Sari Indah", nim: "230002", jurusan: "Teknik Informatika", angkatan: 2023 },
  { id: 3, nama: "Rizky Pratama", nim: "230003", jurusan: "Manajemen", angkatan: 2024 },
  { id: 4, nama: "Dewi Lestari", nim: "230004", jurusan: "Akuntansi", angkatan: 2024 },
  { id: 5, nama: "Andi Wijaya", nim: "230005", jurusan: "Sistem Informasi", angkatan: 2025 },
]
```

**Soal 2**

```ts
// types.ts
export interface Mahasiswa {
  id: number
  nama: string
  nim: string
  jurusan: string
  angkatan: number
  email: string
}
```

```tsx
// App.tsx — update data & kolom
<th>Nama</th><th>NIM</th><th>Jurusan</th><th>Email</th>
...
<td>{m.nama}</td><td>{m.nim}</td><td>{m.jurusan}</td><td>{m.email}</td>
```

**Soal 3**

```tsx
<p>Total mahasiswa: {mahasiswa.length}</p>
```

</details>
