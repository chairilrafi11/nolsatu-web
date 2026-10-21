# Bab 8 — UPDATE: Edit Data Mahasiswa

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Mengedit data dengan `map` (ganti item yang cocok)
- Mengisi form dengan data lama saat edit

## 🎮 Analogi Mobile Legends

Saat hero **di-balance** (di-buff atau di-nerf), MOONTON tidak menghapus hero lalu membuat baru — mereka **mengubah** stat hero yang ada. Data lain tetap.

Sekarang kita bikin fitur **edit mahasiswa** — huruf "U" di CRUD. Setelah ini CRUD lengkap.

## 📖 Materi

### 1. Cara mengubah satu item di array

Untuk edit, kita `map` array, dan saat menemukan id yang cocok, ganti dengan data baru:

```ts
const dataBaru = mahasiswa.map((m) => {
  if (m.id === idYangDiedit) {
    return dataBaruYangLengkap
  }
  return m   // item lain tetap
})
```

Dengan arrow function pendek:

```ts
mahasiswa.map((m) => (m.id === idYangDiedit ? dataBaru : m))
```

> `map` = "untuk tiap item, kembalikan sesuatu". Item yang cocok → diganti, sisanya → tetap.

### 2. Alur edit di dashboard

Form yang sama dipakai untuk **tambah** dan **edit**. Bedanya:

| Mode | Aksi tombol | Form terisi |
|------|-------------|-------------|
| Tambah | Tambahkan item baru | kosong |
| Edit | Ganti item yang cocok | data lama |

Kita butuh satu state lagi: **mahasiswa yang sedang diedit** (atau `null` kalau sedang tidak edit).

```tsx
const [sedangEdit, setSedangEdit] = useState<number | null>(null)
```

- `sedangEdit = null` → mode tambah
- `sedangEdit = 3` → sedang edit mahasiswa id 3

### 3. Tombol "Edit" mengisi form

Saat klik Edit, isi form dengan data mahasiswa itu dan set mode edit:

```tsx
function mulaiEdit(m: Mahasiswa) {
  setNama(m.nama)
  setNim(m.nim)
  setJurusan(m.jurusan)
  setSedangEdit(m.id)
}
```

Tombol di tiap baris:

```tsx
<button
  onClick={() => mulaiEdit(m)}
  className="text-blue-600 hover:text-blue-700 mr-3"
>
  Edit
</button>
```

### 4. Fungsi simpan (tambah ATAU edit)

Gabungkan logika tambah & edit di satu fungsi:

```tsx
function simpan(e: FormEvent) {
  e.preventDefault()

  if (sedangEdit === null) {
    // mode TAMBAH
    const baru: Mahasiswa = {
      id: Date.now(),
      nama,
      nim,
      jurusan,
      angkatan: 2024,
    }
    setMahasiswa([...mahasiswa, baru])
  } else {
    // mode EDIT
    setMahasiswa(
      mahasiswa.map((m) =>
        m.id === sedangEdit
          ? { ...m, nama, nim, jurusan }
          : m
      )
    )
    setSedangEdit(null)
  }

  setNama('')
  setNim('')
  setJurusan('')
}
```

Bedah bagian edit:

```ts
m.id === sedangEdit ? { ...m, nama, nim, jurusan } : m
```

- `{ ...m, nama }` → ambil semua data `m` (spread), **tapi timpa** `nama`, `nim`, `jurusan` dengan nilai form terbaru

### 5. Ubah teks tombol submit

Tombol submit menyesuaikan mode:

```tsx
<button type="submit" className="...">
  {sedangEdit === null ? 'Tambah' : 'Simpan Perubahan'}
</button>
```

Tambahan bagus: tombol "Batal" kalau sedang edit:

```tsx
{sedangEdit !== null && (
  <button type="button" onClick={() => {
    setSedangEdit(null)
    setNama(''); setNim(''); setJurusan('')
  }}>
    Batal
  </button>
)}
```

> `sedangEdit !== null && (...)` → tampil hanya saat kondisi benar (conditional rendering). Kalau `false`, React tidak menampilkan apa-apa.

## 💪 Latihan

### Soal 1
Implementasikan edit lengkap: tombol Edit, form terisi data lama, simpan mengganti data.

### Soal 2
Tambahkan state `angkatan` dan `email` ke form & ke logika simpan (edit dan tambah).

### Soal 3
Ubah tombol submit jadi "Tambah Mahasiswa" saat mode tambah dan "Simpan Perubahan" saat mode edit. Plus tombol Batal.

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1-3** gabungan:

```tsx
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Mahasiswa } from './types'

const dataAwal: Mahasiswa[] = [
  { id: 1, nama: "Budi Santoso", nim: "230001", jurusan: "Sistem Informasi", angkatan: 2023, email: "budi@gmail.com" },
  { id: 2, nama: "Sari Indah", nim: "230002", jurusan: "Teknik Informatika", angkatan: 2023, email: "sari@gmail.com" },
]

function App() {
  const [mahasiswa, setMahasiswa] = useState<Mahasiswa[]>(dataAwal)
  const [nama, setNama] = useState('')
  const [nim, setNim] = useState('')
  const [jurusan, setJurusan] = useState('')
  const [angkatan, setAngkatan] = useState<number>(2024)
  const [email, setEmail] = useState('')
  const [sedangEdit, setSedangEdit] = useState<number | null>(null)

  function simpan(e: FormEvent) {
    e.preventDefault()

    if (sedangEdit === null) {
      const baru: Mahasiswa = {
        id: Date.now(),
        nama, nim, jurusan, angkatan, email,
      }
      setMahasiswa([...mahasiswa, baru])
    } else {
      setMahasiswa(
        mahasiswa.map((m) =>
          m.id === sedangEdit
            ? { ...m, nama, nim, jurusan, angkatan, email }
            : m
        )
      )
      setSedangEdit(null)
    }

    setNama(''); setNim(''); setJurusan(''); setAngkatan(2024); setEmail('')
  }

  function mulaiEdit(m: Mahasiswa) {
    setNama(m.nama)
    setNim(m.nim)
    setJurusan(m.jurusan)
    setAngkatan(m.angkatan)
    setEmail(m.email)
    setSedangEdit(m.id)
  }

  function hapusMahasiswa(id: number) {
    const yakin = window.confirm('Yakin hapus mahasiswa ini?')
    if (yakin) {
      setMahasiswa(mahasiswa.filter((m) => m.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Mahasiswa</h1>

        <form onSubmit={simpan} className="bg-white rounded-lg shadow p-6 mb-6 space-y-3">
          <input value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama"
            className="border rounded-lg px-3 py-2 w-full" />
          <input value={nim} onChange={(e) => setNim(e.target.value)} placeholder="NIM"
            className="border rounded-lg px-3 py-2 w-full" />
          <input value={jurusan} onChange={(e) => setJurusan(e.target.value)} placeholder="Jurusan"
            className="border rounded-lg px-3 py-2 w-full" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="border rounded-lg px-3 py-2 w-full" />
          <input value={angkatan} onChange={(e) => setAngkatan(Number(e.target.value))} placeholder="Angkatan"
            type="number" className="border rounded-lg px-3 py-2 w-full" />

          <div className="flex gap-2">
            <button type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              {sedangEdit === null ? 'Tambah Mahasiswa' : 'Simpan Perubahan'}
            </button>
            {sedangEdit !== null && (
              <button type="button" onClick={() => {
                setSedangEdit(null)
                setNama(''); setNim(''); setJurusan(''); setEmail('')
              }}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                Batal
              </button>
            )}
          </div>
        </form>

        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-sm text-gray-500">Nama</th>
                <th className="py-2 text-sm text-gray-500">NIM</th>
                <th className="py-2 text-sm text-gray-500">Jurusan</th>
                <th className="py-2 text-sm text-gray-500">Angkatan</th>
                <th className="py-2 text-sm text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswa.map((m) => (
                <tr key={m.id} className="border-b">
                  <td className="py-3">{m.nama}</td>
                  <td className="py-3 text-gray-600">{m.nim}</td>
                  <td className="py-3 text-gray-600">{m.jurusan}</td>
                  <td className="py-3 text-gray-600">{m.angkatan}</td>
                  <td className="py-3">
                    <button onClick={() => mulaiEdit(m)}
                      className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                    <button onClick={() => hapusMahasiswa(m.id)}
                      className="text-red-500 hover:text-red-700">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
```

</details>
