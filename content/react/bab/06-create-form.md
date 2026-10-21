# Bab 6 — CREATE: Tambah Data Mahasiswa

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membuat form dengan controlled input
- Menambahkan data baru ke state array

## 🎮 Analogi Mobile Legends

Saat ada hero baru dirilis, MOONTON **menambahkan** hero itu ke daftar hero di game. Begitu rilis, hero langsung muncul di halaman "Choose Hero".

Sekarang kita bikin fitur **tambah mahasiswa**: user mengisi form, klik simpan, lalu data **masuk ke tabel**. Ini huruf "C" di CRUD.

## 📖 Materi

### 1. State untuk form

Kita buat 3 state untuk 3 field form (nama, nim, jurusan):

```tsx
const [nama, setNama] = useState('')
const [nim, setNim] = useState('')
const [jurusan, setJurusan] = useState('')
```

> Kenapa tidak pakai satu state? Gampang dulu. Di aplikasi sungguhan boleh juga digabung satu object.

### 2. Form dengan controlled input

```tsx
function App() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>(dataAwal)
  const [nama, setNama] = useState('')
  const [nim, setNim] = useState('')
  const [jurusan, setJurusan] = useState('')

  function tambahMahasiswa(e) {
    e.preventDefault()   // cegah reload halaman

    const baru: Mahasiswa = {
      id: Date.now(),      // angka unik dari jam saat ini
      nama: nama,
      nim: nim,
      jurusan: jurusan,
      angkatan: 2024,
    }

    setMahasiswa([...mahasiswa, baru])   // data lama + data baru
  }

  return (
    ...
    <form onSubmit={tambahMahasiswa} className="space-y-3 mb-6">
      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama"
        className="border rounded-lg px-3 py-2 w-full"
      />
      <input
        value={nim}
        onChange={(e) => setNim(e.target.value)}
        placeholder="NIM"
        className="border rounded-lg px-3 py-2 w-full"
      />
      <input
        value={jurusan}
        onChange={(e) => setJurusan(e.target.value)}
        placeholder="Jurusan"
        className="border rounded-lg px-3 py-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Tambah
      </button>
    </form>
    ...
  )
}
```

### 3. Bedah bagian penting

**`onSubmit` + `e.preventDefault()`**

```tsx
<form onSubmit={tambahMahasiswa}>
```

Tanpa `e.preventDefault()`, saat submit browser **me-refresh halaman** — semua data hilang. Fungsi ini mencegah itu.

> Aturan: form React **wajib** panggil `e.preventDefault()` di handler submit.

**`setMahasiswa([...mahasiswa, baru])`**

Operator **spread** `...mahasiswa` mengambil semua isi array lama, lalu kita tambah `baru` di ujungnya.

```ts
[...mahasiswa, baru]
// = [data lama..., data baru]
```

> Kenapa tidak `mahasiswa.push(baru)`? Ingat aturan emas bab 3: **jangan ubah state langsung**. Kita buat **array baru** (pakai `...`), lalu set. React hanya mendeteksi perubahan kalau diberikan objek/array baru.

**`Date.now()` untuk id**

id harus unik. `Date.now()` = milidetik saat ini, hampir mustahil kembar dua kali.

### 4. TypeScript untuk event handler

TypeScript akan protes kalau `e` tanpa tipe. Beri tipe:

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'

function tambahMahasiswa(e: FormEvent) {
  e.preventDefault()
  ...
}
```

## 💪 Latihan

### Soal 1
Tambahkan field "Angkatan" ke form (input angka), pakai state `angkatan`, dan masukkan ke data baru.

### Soal 2
Tambahkan field "Email" ke form dan ke interface `Mahasiswa` (kalau belum), lalu simpan juga ke data baru.

### Soal 3
Setelah submit, kosongkan form lagi (set semua state form jadi `''`). Petunjuk: panggil `setNama('')`, dst. di akhir `tambahMahasiswa`.

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 3** — lengkap dengan pengosongan form:

```tsx
function tambahMahasiswa(e: FormEvent) {
  e.preventDefault()

  const baru: Mahasiswa = {
    id: Date.now(),
    nama: nama,
    nim: nim,
    jurusan: jurusan,
    angkatan: 2024,
  }

  setMahasiswa([...mahasiswa, baru])

  // kosongkan form
  setNama('')
  setNim('')
  setJurusan('')
}
```

**Soal 1 & 2**: pola sama — tambah state, input baru, dan field baru di object `baru`.

</details>
