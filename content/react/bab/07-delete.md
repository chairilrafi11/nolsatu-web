# Bab 7 — DELETE: Hapus Data Mahasiswa

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menghapus data dari state array dengan `filter`
- Menambahkan tombol hapus di tiap baris tabel

## 🎮 Analogi Mobile Legends

Saat hero sudah tidak dipakai, MOONTON bisa **menghapusnya** dari daftar (atau saat kamu menghapus teman dari daftar pertemanan).

Sekarang kita bikin fitur **hapus mahasiswa** — huruf "D" di CRUD.

## 📖 Materi

### 1. `filter` — cara menghapus di React

Ingat aturan emas: **jangan ubah state langsung**. Untuk menghapus, kita **buat array baru tanpa item yang dihapus** — pakai `.filter()`.

`filter` mengembalikan array baru berisi **hanya item yang lolos syarat**:

```ts
const angka = [1, 2, 3, 4]
const besar = angka.filter((n) => n > 2)
// besar = [3, 4]
```

Untuk hapus item dengan id tertentu: pertahankan semua item **kecuali** yang id-nya cocok.

```ts
const dataBaru = mahasiswa.filter((m) => m.id !== idYangDihapus)
```

> Baca: "buat array baru berisi semua `m` yang id-nya **tidak sama** dengan `idYangDihapus`". Item yang cocok otomatis hilang.

### 2. Fungsi hapus

```tsx
function hapusMahasiswa(id: number) {
  setMahasiswa(mahasiswa.filter((m) => m.id !== id))
}
```

Fungsi ini menerima `id` mahasiswa yang mau dihapus, lalu set state dengan array baru yang sudah tanpa item itu.

### 3. Tombol hapus di tiap baris

Tambahkan kolom baru di tabel:

```tsx
<tbody>
  {mahasiswa.map((m) => (
    <tr key={m.id} className="border-b">
      <td className="py-3">{m.nama}</td>
      <td className="py-3 text-gray-600">{m.nim}</td>
      <td className="py-3 text-gray-600">{m.jurusan}</td>
      <td className="py-3 text-gray-600">{m.angkatan}</td>
      <td className="py-3">
        <button
          onClick={() => hapusMahasiswa(m.id)}
          className="text-red-500 hover:text-red-700"
        >
          Hapus
        </button>
      </td>
    </tr>
  ))}
</tbody>
```

Jangan lupa tambah header kolom:

```tsx
<th className="py-2 text-sm text-gray-500">Aksi</th>
```

### 4. Bedah `onClick={() => hapusMahasiswa(m.id)}`

Kenapa ditulis dengan arrow function `() => ...` dan bukan `hapusMahasiswa(m.id)`?

Karena `onClick` butuh **fungsi** (yang dijalankan nanti saat diklik), bukan hasil panggilan.

- `onClick={hapusMahasiswa(m.id)}` ❌ → `hapusMahasiswa` langsung jalan saat render, bukan saat klik
- `onClick={() => hapusMahasiswa(m.id)}` ✅ → bikin fungsi yang nanti dijalankan saat klik

> Aturan: kalau handler **butuh argumen**, bungkus dengan `() =>`. Kalau tidak butuh argumen, bisa langsung nama fungsinya.

### 5. Konfirmasi hapus (pemanis)

Biar tidak salah hapus, pakai `confirm`:

```tsx
function hapusMahasiswa(id: number) {
  const yakin = window.confirm('Yakin hapus mahasiswa ini?')
  if (yakin) {
    setMahasiswa(mahasiswa.filter((m) => m.id !== id))
  }
}
```

`confirm` menampilkan dialog "OK / Cancel". Hapus hanya jalan kalau user pilih OK.

## 💪 Latihan

### Soal 1
Pasang fungsi hapus + tombol hapus seperti materi, dan uji: tambah beberapa mahasiswa, lalu hapus salah satu.

### Soal 2
Tambahkan `window.confirm` ke fungsi hapus. Lihat dialog muncul.

### Soal 3
Tambah tombol "Hapus Semua" di atas tabel yang menghapus seluruh data sekaligus (set `mahasiswa` jadi array kosong `[]`).

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 3**

```tsx
function hapusSemua() {
  setMahasiswa([])
}
```

```tsx
<button
  onClick={hapusSemua}
  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mb-4"
>
  Hapus Semua
</button>
```

</details>
