# Bab 1 — Setup Vite + TypeScript + Tailwind

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membuat projek React + Vite dengan TypeScript
- Menjalankan projek dan membukanya di browser
- Memasang Tailwind CSS
- Memahami isi struktur folder projek

## 🎮 Analogi Mobile Legends

Ingat saat **install game** Mobile Legends pertama kali? Kamu unduh aplikasi, login, lalu main. Sebelum main, ada langkah persiapan.

Sekarang kita "install" semua bahan untuk membuat web app. Ini langkah persiapan yang **hanya dilakukan sekali**. Setelah selesai, dari bab 2 sampai 10 kita tinggal ngoding.

## 📖 Materi

### 1. Pastikan Node.js terinstall

Buka terminal (di VS Code: `Terminal → New Terminal`), lalu cek:

```bash
node -v
npm -v
```

Kalau muncul versi (misal `v20.x.x`), berarti siap. Kalau error, install Node.js dulu dari [nodejs.org](https://nodejs.org) (pilih versi **LTS**).

> Node.js = JavaScript yang bisa jalan di komputer (bukan cuma di browser). React butuh Node.js.

### 2. Buat projek Vite

Di terminal, masuk ke folder yang kamu mau (misal folder `course`), lalu jalankan:

```bash
npm create vite@latest dashboard-mahasiswa -- --template react-ts
```

Kalau muncul pertanyaan, pilih `Yes` untuk install paket.

Lalu:

```bash
cd dashboard-mahasiswa
npm install
npm run dev
```

Buka browser ke alamat yang muncul (biasanya `http://localhost:5173`). Kalau muncul halaman Vite + React, **sukses!**

> `npm run dev` = menjalankan server pengembangan. Selama server ini hidup, tiap kali kamu ubah kode, halaman otomatis refresh.

### 3. Pasang Tailwind CSS

Stop server dulu (tekan `Ctrl+C` di terminal), lalu jalankan:

```bash
npm install tailwindcss @tailwindcss/vite
```

Lalu buka file `vite.config.ts`, ubah isinya jadi:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Lalu buka `src/index.css`, hapus semua isinya, ganti dengan satu baris:

```css
@import "tailwindcss";
```

Jalankan lagi:

```bash
npm run dev
```

Tailwind aktif. (Kita pakai Tailwind mulai bab 5.)

### 4. Bedah struktur folder

Buka folder projek di VS Code. Ini yang penting:

```
dashboard-mahasiswa/
├── index.html          → halaman utama yang dibuka browser
├── package.json        → daftar paket/dependensi + script
├── vite.config.ts      → konfigurasi Vite
└── src/                → TEMPAT KODE KITA
    ├── main.tsx        → titik masuk aplikasi
    ├── App.tsx         → komponen utama (kita banyak kerja di sini)
    ├── App.css         → styling App
    └── index.css       → styling global (sudah kita isi tailwind)
```

Analoginya:
- `index.html` = lahan/lapangan
- `src/main.tsx` = gerbang masuk
- `src/App.tsx` = pemain utama (yang nanti kita isi)

### 5. Lihat isi `App.tsx`

Buka `src/App.tsx`. Isinya kira-kira:

```tsx
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        ... (banyak kode demo)
      </div>
    </>
  )
}

export default App
```

Jangan takut. Kode demo ini nanti kita hapus di bab 2. Yang penting lihat: file React itu pakai **`.tsx`** (bukan `.ts`), karena isinya campuran JavaScript + HTML (namanya **JSX**, dibahas bab 2).

### 6. Bersihkan file demo

Sekarang kita rapikan. Edit `src/App.tsx` jadi minimal:

```tsx
function App() {
  return (
    <div>
      <h1>Dashboard Mahasiswa</h1>
    </div>
  )
}

export default App
```

Edit `src/index.css` — pastikan cuma berisi:

```css
@import "tailwindcss";
```

Hapus isi `src/App.css` (biarkan file-nya, isinya kosongkan).

Simpan, lihat browser: harusnya tampil "Dashboard Mahasiswa" polos.

> Mulai sekarang, projek ini yang kita pakai terus sampai bab 10.

## 💪 Latihan

### Soal 1
Ubah teks di dalam `<h1>` jadi namamu sendiri. Simpan, lihat hasilnya di browser.

### Soal 2
Tambah satu baris `<p>` di bawah `<h1>` berisi kalimat bebas. Lihat hasilnya.

### Soal 3
Sebutkan fungsi dari: `index.html`, `src/main.tsx`, dan `src/App.tsx` (pakai kata-katamu sendiri).

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```tsx
function App() {
  return (
    <div>
      <h1>Budi</h1>
    </div>
  )
}

export default App
```

**Soal 2**

```tsx
function App() {
  return (
    <div>
      <h1>Dashboard Mahasiswa</h1>
      <p>Belajar React itu seru</p>
    </div>
  )
}

export default App
```

**Soal 3**
- `index.html` = halaman HTML utama yang dibuka browser (wadah semua).
- `src/main.tsx` = titik masuk aplikasi React; di sinilah `App` dipasang ke halaman.
- `src/App.tsx` = komponen utama; sebagian besar UI kita tulis di sini.

</details>
