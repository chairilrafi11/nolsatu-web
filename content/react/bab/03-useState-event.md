# Bab 3 — State & Event (useState)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Memahami apa itu state di React
- Menggunakan `useState` untuk menyimpan data yang berubah
- Menangani event (klik, ketik) dengan `onClick` dan `onChange`

## 🎮 Analogi Mobile Legends

Saat main, **HP hero kamu berubah-ubah** — kena skill musuh turun, healing naik. Game terus menampilkan angka HP yang **selalu terbaru**.

Di React, data yang berubah seperti HP ini namanya **state**. Saat state berubah, React **otomatis** menggambar ulang tampilannya dengan nilai terbaru.

> **State** = data yang berubah selama aplikasi berjalan. Saat state berubah, tampilan otomatis ikut berubah.

## 📖 Materi

### 1. `useState` — cara menyimpan state

`useState` adalah "kotak ajaib" React: saat isinya diganti, tampilan otomatis di-refresh.

```tsx
import { useState } from 'react'

function App() {
  const [hp, setHp] = useState(2600)

  return <p>HP hero: {hp}</p>
}
```

Bedah:

- `useState(2600)` → bikin state dengan nilai awal `2600`
- `hp` → nilai saat ini (untuk dibaca)
- `setHp` → fungsi untuk **mengubah** nilai

> Aturan emas: **JANGAN pernah ubah state secara langsung** (`hp = 10` ❌). Selalu pakai `setHp` (`setHp(10)` ✅).

Kenapa? Karena hanya lewat `setHp` React "tahu" nilai berubah, lalu menggambar ulang tampilan.

### 2. Event: `onClick`

Saat tombol diklik, jalankan fungsi.

```tsx
import { useState } from 'react'

function App() {
  const [hp, setHp] = useState(2600)

  function kenaSerang() {
    setHp(hp - 500)   // ubah state lewat setHp
  }

  return (
    <div>
      <p>HP hero: {hp}</p>
      <button onClick={kenaSerang}>Kena serang (-500)</button>
    </div>
  )
}

export default App
```

Saat tombol diklik: `kenaSerang` dijalankan → `setHp(hp - 500)` → state berubah → tampilan di-refresh otomatis.

> `onClick={kenaSerang}` — perhatikan: **tanpa** tanda kurung! Kita kasih fungsi-nya, bukan hasil panggilannya. Kalau `kenaSerang()` (dengan kurung), fungsi langsung jalan sebelum diklik.

### 3. Event: `onChange` (mengetik di input)

Saat pengguna mengetik di input, kita simpan hasil ketikan ke state.

```tsx
import { useState } from 'react'

function App() {
  const [teks, setTeks] = useState('')

  return (
    <div>
      <input
        value={teks}
        onChange={(e) => setTeks(e.target.value)}
        placeholder="Ketik sesuatu..."
      />
      <p>Kamu mengetik: {teks}</p>
    </div>
  )
}

export default App
```

Bedah:

- `value={teks}` → isi input selalu mengikuti state `teks`
- `onChange` → dipanggil tiap kali ada ketikan
- `e` → objek event; `e.target.value` = isi input saat ini
- `(e) => setTeks(e.target.value)` → arrow function: jalankan `setTeks` dengan nilai terbaru

Alur lengkap: kamu ketik "a" → `onChange` jalan → `setTeks("a")` → state berubah → input menampilkan "a".

> Pola `value + onChange` ini disebut **controlled input** (input yang "dikendalikan" state). Ini dasar form di React — dipakai banyak di bab 6-8.

### 4. State bisa menyimpan apa saja

State tidak harus angka atau teks. Bisa array, object, boolean:

```tsx
const [terbuka, setTerbuka] = useState(false)          // boolean
const [daftar, setDaftar] = useState<string[]>([])      // array string
```

Catatan TypeScript: kalau nilai awal kosong, beri tahu tipenya (`useState<string[]>([])` artinya "array berisi string, kosong").

### 5. Beberapa state sekaligus

```tsx
const [nama, setNama] = useState('')
const [nim, setNim] = useState('')
```

Tiap state punya pasangan `set`-nya sendiri. Jangan digabung membingungkan.

## 💪 Latihan

### Soal 1
Buat counter level hero: tampilkan angka level, tombol "Level up" (`+1`), dan tombol "Reset" (kembali ke 0).

### Soal 2
Buat input nama hero (controlled input) + tampilkan teks "Hero kamu: <nama>" di bawahnya.

### Soal 3
Buat state boolean `ultimateSiap` (awal `false`). Tombol "Aktifkan Ulti" mengubahnya jadi `true`, dan tampilkan "Ulti siap!" saat `true`, atau "Ulti belum siap" saat `false`. (Petunjuk: pakai ternary `kondisi ? a : b`.)

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```tsx
import { useState } from 'react'

function App() {
  const [level, setLevel] = useState(1)

  return (
    <div>
      <p>Level: {level}</p>
      <button onClick={() => setLevel(level + 1)}>Level up</button>
      <button onClick={() => setLevel(0)}>Reset</button>
    </div>
  )
}

export default App
```

**Soal 2**

```tsx
import { useState } from 'react'

function App() {
  const [nama, setNama] = useState('')

  return (
    <div>
      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama hero"
      />
      <p>Hero kamu: {nama}</p>
    </div>
  )
}

export default App
```

**Soal 3**

```tsx
import { useState } from 'react'

function App() {
  const [ultimateSiap, setUltimateSiap] = useState(false)

  return (
    <div>
      <button onClick={() => setUltimateSiap(true)}>Aktifkan Ulti</button>
      <p>{ultimateSiap ? 'Ulti siap!' : 'Ulti belum siap'}</p>
    </div>
  )
}

export default App
```

</details>
