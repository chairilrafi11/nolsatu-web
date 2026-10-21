# Bab 2 — JSX, Component, dan Props

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menulis JSX (HTML di dalam JavaScript)
- Membuat komponen sendiri
- Mengirim data ke komponen dengan props
- Membuat interface TypeScript

## 🎮 Analogi Mobile Legends

Perhatikan skill slot di Mobile Legends — ada slot skill 1, skill 2, skill 3, dan ulti. Tiap slot punya **bentuk yang sama** (kotak bundar), tapi **isinya beda** (gambar skill beda).

Di React, kita bikin "slot" ini sekali sebagai **komponen**, lalu pakai berulang kali dengan isi berbeda.

> **Komponen** = potongan UI yang bisa dipakai ulang. Seperti slot skill: bentuknya sama, isinya beda lewat "props".

## 📖 Materi

### 1. JSX — HTML di dalam JavaScript

React membiarkan kita menulis tampilan **langsung di dalam file TypeScript/JavaScript**, dengan sintaks mirip HTML. Ini namanya **JSX**.

```tsx
function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Ini JSX.</p>
    </div>
  )
}
```

Aturan penting JSX:

**1. Satu komponen return SATU elemen pembungkus.** Kalau ada banyak, bungkus dengan `<>...</>` (fragment):

```tsx
return (
  <>
    <h1>Judul</h1>
    <p>Isi</p>
  </>
)
```

**2. Mengubah nilai: pakai `{ }` (kurung kurawal).**

```tsx
function App() {
  const nama = "Budi"

  return (
    <p>Halo, {nama}!</p>  // jadi "Halo, Budi!"
  )
}
```

> `{ }` di JSX = "tulis kode JavaScript di sini". Ini jembatan dari dunia JavaScript ke tampilan.

**3. Class HTML → `className`.**

```tsx
// HTML: <div class="menu">
<div className="menu">  // React pakai className
```

### 2. Membuat komponen

Komponen = fungsi JavaScript yang mengembalikan JSX. Nama komponen **wajib huruf besar di awal**.

```tsx
// File: src/components/KartuMahasiswa.tsx

function KartuMahasiswa() {
  return (
    <div>
      <h2>Budi Santoso</h2>
      <p>NIM: 12345678</p>
    </div>
  )
}

export default KartuMahasiswa
```

Lalu pakai di `App.tsx`:

```tsx
import KartuMahasiswa from './components/KartuMahasiswa'

function App() {
  return (
    <>
      <KartuMahasiswa />
      <KartuMahasiswa />
      <KartuMahasiswa />
    </>
  )
}

export default App
```

Hasilnya: 3 kartu mahasiswa, isinya sama persis (Budi Santoso). Itu masalahnya — kita mau kartu yang **berbeda-beda**. Solusinya: **props**.

### 3. Props — kirim data ke komponen

Props = "parameter" untuk komponen (ingat method dengan parameter di course Java? Sama!). Komponen menerima data lewat atribut:

```tsx
import KartuMahasiswa from './components/KartuMahasiswa'

function App() {
  return (
    <>
      <KartuMahasiswa nama="Budi" nim="12345678" jurusan="Sistem Informasi" />
      <KartuMahasiswa nama="Sari" nim="23456789" jurusan="Teknik Informatika" />
    </>
  )
}

export default App
```

Di dalam komponen, data diterima lewat objek `props`:

```tsx
function KartuMahasiswa(props) {
  return (
    <div>
      <h2>{props.nama}</h2>
      <p>NIM: {props.nim}</p>
      <p>Jurusan: {props.jurusan}</p>
    </div>
  )
}

export default KartuMahasiswa
```

### 4. TypeScript: interface untuk props

TypeScript butuh **tipe data** — ingat course Java? `int`, `String`, `boolean`? Di sini kita definisikan tipe untuk props supaya tidak bisa salah kirim.

```tsx
interface PropsKartu {
  nama: string
  nim: string
  jurusan: string
}

function KartuMahasiswa(props: PropsKartu) {
  return (
    <div>
      <h2>{props.nama}</h2>
      <p>NIM: {props.nim}</p>
      <p>Jurusan: {props.jurusan}</p>
    </div>
  )
}

export default KartuMahasiswa
```

Kalau kamu lupa kirim `nama`, VS Code langsung kasih peringatan error. Ini kekuatan TypeScript — error ketahuan **sebelum dijalankan**.

> `interface` = definisi bentuk data. Seperti blueprint object di Java.

### 5. Interface `Mahasiswa` — data utama aplikasi

Kita sepakati bentuk data mahasiswa (dipakai terus sampai bab 10):

```ts
interface Mahasiswa {
  id: number
  nama: string
  nim: string
  jurusan: string
  angkatan: number
}
```

Buat file baru `src/types.ts` berisi interface ini, supaya bisa dipakai di banyak file:

```ts
export interface Mahasiswa {
  id: number
  nama: string
  nim: string
  jurusan: string
  angkatan: number
}
```

> `export` = boleh dipakai di file lain (mirip `public` di Java).

Contoh data:

```ts
const dataAwal: Mahasiswa[] = [
  { id: 1, nama: "Budi Santoso", nim: "230001", jurusan: "Sistem Informasi", angkatan: 2023 },
  { id: 2, nama: "Sari Indah", nim: "230002", jurusan: "Teknik Informatika", angkatan: 2023 },
]
```

`Mahasiswa[]` = "array berisi Mahasiswa" (ingat `String[]` di course Java?).

## 💪 Latihan

### Soal 1
Buat komponen `Banner` yang menampilkan teks "Sistem Informasi — Dashboard Mahasiswa", lalu tampilkan di `App.tsx`.

### Soal 2
Ubah komponen `KartuMahasiswa` dari materi supaya menerima props tambahan `angkatan: number` dan menampilkannya.

### Soal 3
Di file `src/types.ts`, tambahkan satu field baru `email: string` ke interface `Mahasiswa`. (Nanti dipakai di bab-bab selanjutnya.)

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```tsx
// src/components/Banner.tsx
function Banner() {
  return <h1>Sistem Informasi — Dashboard Mahasiswa</h1>
}

export default Banner
```

```tsx
// src/App.tsx
import Banner from './components/Banner'

function App() {
  return (
    <>
      <Banner />
    </>
  )
}

export default App
```

**Soal 2**

```tsx
interface PropsKartu {
  nama: string
  nim: string
  jurusan: string
  angkatan: number
}

function KartuMahasiswa(props: PropsKartu) {
  return (
    <div>
      <h2>{props.nama}</h2>
      <p>NIM: {props.nim}</p>
      <p>Jurusan: {props.jurusan}</p>
      <p>Angkatan: {props.angkatan}</p>
    </div>
  )
}

export default KartuMahasiswa
```

**Soal 3**

```ts
export interface Mahasiswa {
  id: number
  nama: string
  nim: string
  jurusan: string
  angkatan: number
  email: string
}
```

</details>
