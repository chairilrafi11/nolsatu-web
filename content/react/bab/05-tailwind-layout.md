# Bab 5 — Styling dengan Tailwind CSS

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Memakai class Tailwind untuk styling
- Membuat layout dashboard yang rapi (tabel, tombol, judul)

## 🎮 Analogi Mobile Legends

Lihat menu utama Mobile Legends — tombol "Match Up", "Ranked", icon hero, semuanya **rapi dan konsisten**: warna senada, jarak seragam, sudut membulat.

Styling = membuat tampilan "enak dilihat". Tailwind adalah cara **cepat** menulis styling: tinggal tempel class di elemen, tanpa buka file CSS terpisah.

## 📖 Materi

### 1. Cara kerja Tailwind

Tailwind = kumpulan class kecil yang tiap class mengatur **satu hal**:

```tsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
  Tambah
</button>
```

Terjemahan tiap class:

| Class | Arti |
|-------|------|
| `bg-blue-500` | latar biru |
| `text-white` | teks putih |
| `px-4` | padding kiri-kanan |
| `py-2` | padding atas-bawah |
| `rounded-lg` | sudut membulat |

> Ingat: di React, atribut `class` HTML ditulis `className`.

### 2. Class Tailwind paling sering dipakai

**Warna & latar:**
- `bg-white`, `bg-gray-100`, `bg-blue-600`
- `text-gray-900`, `text-blue-600`, `text-red-500`

**Jarak (padding/margin):**
- `p-4` (semua sisi), `px-4` (kiri-kanan), `py-2` (atas-bawah)
- `m-4`, `mx-auto` (tengah), `mb-4` (margin bawah), `mt-2`

**Teks:**
- `text-xl` (besar), `text-sm` (kecil), `font-bold` (tebal)

**Layout:**
- `flex` (sejajar), `gap-4` (jarak antar item), `justify-between` (dipisah rata)

**Batas & bentuk:**
- `border`, `rounded-lg`, `shadow` (bayangan)
- `hover:bg-blue-700` (berubah saat kursor di atas)

> Pola penting: `hover:` di depan class artinya "hanya saat hover". Contoh: `hover:bg-blue-700`.

### 3. Layout dashboard

Struktur dashboard kita: judul atas, lalu konten di tengah dengan lebar maksimal.

```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard Mahasiswa
        </h1>

        <div className="bg-white rounded-lg shadow p-6">
          {/* tabel ada di sini */}
        </div>
      </div>
    </div>
  )
}
```

- `min-h-screen` → minimal setinggi layar
- `bg-gray-100` → latar abu muda
- `p-8` → padding dalam
- `mx-auto max-w-4xl` → konten di tengah, maksimal lebar tertentu
- `bg-white rounded-lg shadow` → kartu putih dengan sudut & bayangan

### 4. Tabel yang rapi

```tsx
<table className="w-full text-left">
  <thead>
    <tr className="border-b">
      <th className="py-2 text-sm text-gray-500">Nama</th>
      <th className="py-2 text-sm text-gray-500">NIM</th>
      <th className="py-2 text-sm text-gray-500">Jurusan</th>
      <th className="py-2 text-sm text-gray-500">Angkatan</th>
    </tr>
  </thead>
  <tbody>
    {mahasiswa.map((m) => (
      <tr key={m.id} className="border-b">
        <td className="py-3">{m.nama}</td>
        <td className="py-3 text-gray-600">{m.nim}</td>
        <td className="py-3 text-gray-600">{m.jurusan}</td>
        <td className="py-3 text-gray-600">{m.angkatan}</td>
      </tr>
    ))}
  </tbody>
</table>
```

- `w-full` → tabel selebar wadahnya
- `text-left` → teks rata kiri
- `border-b` → garis bawah tiap baris
- `py-2`/`py-3` → jarak vertikal tiap sel

### 5. Tombol

```tsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  Tambah Mahasiswa
</button>
```

## 💪 Latihan

### Soal 1
Wrap `App.tsx` kamu dengan layout dashboard dari materi (abu muda + kartu putih). Lihat perbedaannya.

### Soal 2
Kasih styling tabel seperti materi (`w-full text-left`, `border-b` di tiap baris).

### Soal 3
Buat judul halaman jadi lebih besar (`text-3xl`), dan tambah subtitle abu (`text-gray-500`) di bawahnya berisi "Kelola data mahasiswa jurusan Sistem Informasi".

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 3** (contoh lengkap judul):

```tsx
<div className="mb-6">
  <h1 className="text-3xl font-bold text-gray-900">Dashboard Mahasiswa</h1>
  <p className="text-gray-500">Kelola data mahasiswa jurusan Sistem Informasi</p>
</div>
```

Struktur lengkap:

```tsx
function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Mahasiswa</h1>
          <p className="text-gray-500">Kelola data mahasiswa jurusan Sistem Informasi</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {/* tabel */}
        </div>
      </div>
    </div>
  )
}
```

</details>
