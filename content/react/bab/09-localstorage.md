# Bab 9 — localStorage: Data Awet walau Refresh

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menyimpan & membaca data dari `localStorage`
- Memakai `useEffect` untuk sinkronisasi state dengan localStorage
- Memuat data saat aplikasi dibuka

## 🎮 Analogi Mobile Legends

Pernah main Mobile Legends, lalu paksa tutup aplikasinya, buka lagi? Progress, hero, skin, rank — **semua masih ada**. Game menyimpan datanya di server/ponsel.

Saat ini dashboard kita: data **hilang saat refresh** (F5), karena state cuma ada di memori. Sekarang kita simpan ke **localStorage** — penyimpanan permanen milik browser. Data tetap ada walau browser ditutup.

## 📖 Materi

### 1. Apa itu localStorage?

`localStorage` = tempat penyimpanan di browser (bertahan lama), bentuknya **teks `key`-`value`**.

```ts
localStorage.setItem('nama', 'Budi')        // simpan
const nama = localStorage.getItem('nama')    // baca → "Budi"
localStorage.removeItem('nama')              // hapus
```

> Batasan: localStorage hanya bisa menyimpan **string**. Jadi object/array harus diubah jadi JSON dulu.

### 2. Simpan & baca array dengan JSON

Ubah array ke teks JSON dengan `JSON.stringify`, dan sebaliknya dengan `JSON.parse`:

```ts
// simpan array
localStorage.setItem('mahasiswa', JSON.stringify(mahasiswa))

// baca array
const data = JSON.parse(localStorage.getItem('mahasiswa') ?? '[]')
```

- `JSON.stringify(...)` → array/object → teks
- `JSON.parse(...)` → teks → array/object
- `?? '[]'` → kalau hasil `getItem` `null`, pakai `'[]'` (array kosong)

### 3. `useEffect` — reaksi saat state berubah

`useEffect` = "jalankan ini setelah render". Kita pakai untuk **menyimpan ke localStorage tiap kali state `mahasiswa` berubah**:

```tsx
import { useEffect } from 'react'

useEffect(() => {
  localStorage.setItem('mahasiswa', JSON.stringify(mahasiswa))
}, [mahasiswa])
```

- Fungsi di dalam dijalankan setelah render
- `[mahasiswa]` → hanya jalankan ulang saat `mahasiswa` berubah

> Dengan ini, tiap kali kamu tambah/hapus/edit data, otomatis tersimpan ke localStorage. Nggak perlu simpan manual.

### 4. Muat data saat aplikasi dibuka

Saat pertama kali dibuka, baca dari localStorage:

```tsx
const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>(() => {
  const tersimpan = localStorage.getItem('mahasiswa')
  return tersimpan ? JSON.parse(tersimpan) : dataAwal
})
```

Bedah: `useState` bisa menerima **fungsi** sebagai nilai awal. Fungsi ini dijalankan **sekali** saat pertama render:

- Ada data tersimpan? → pakai itu
- Tidak ada? → pakai `dataAwal`

> Catatan: kalau nilai awal dari localStorage, kita tulis di `useState(() => ...)` supaya tidak membaca localStorage berulang-ulang tiap render.

### 5. `App.tsx` lengkap (CRUD + localStorage)

```tsx
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { Mahasiswa } from './types'

const dataAwal: Mahasiswa[] = [
  { id: 1, nama: "Budi Santoso", nim: "230001", jurusan: "Sistem Informasi", angkatan: 2023, email: "budi@gmail.com" },
]

function App() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>(() => {
    const tersimpan = localStorage.getItem('mahasiswa')
    return tersimpan ? JSON.parse(tersimpan) : dataAwal
  })

  useEffect(() => {
    localStorage.setItem('mahasiswa', JSON.stringify(mahasiswa))
  }, [mahasiswa])

  // ... (form, simpan, edit, hapus, tabel — sama seperti bab 8)
}

export default App
```

Alur lengkap sekarang:
1. Buka aplikasi → baca localStorage (atau `dataAwal` kalau kosong)
2. Tiap ada perubahan data → `useEffect` simpan ke localStorage
3. Refresh browser → data masih ada

### 6. Cek localStorage di browser

Buka DevTools (F12) → tab **Application** → **Local Storage** → klik domain `localhost`. Di situ terlihat key `mahasiswa` berisi JSON.

## 💪 Latihan

### Soal 1
Tambahkan `useState(() => ...)` dan `useEffect` seperti materi ke `App.tsx` kamu. Uji: tambah data, refresh, data tetap ada.

### Soal 2
Tambahkan tombol "Reset Data" yang mengembalikan data ke `dataAwal`. Petunjuk: `setMahasiswa(dataAwal)`.

### Soal 3
Buka DevTools → Application → Local Storage, dan lihat isi key `mahasiswa`. Salin JSON-nya ke sini (latihan membaca JSON).

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 2**

```tsx
<button
  onClick={() => setMahasiswa(dataAwal)}
  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mb-4"
>
  Reset Data
</button>
```

**Soal 3** — contoh isi localStorage:

```json
[{"id":1,"nama":"Budi Santoso","nim":"230001","jurusan":"Sistem Informasi","angkatan":2023,"email":"budi@gmail.com"}]
```

</details>
