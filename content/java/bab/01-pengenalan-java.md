# Bab 1 — Pengenalan Program & Bahasa Java

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menjelaskan apa itu "program" dan "bahasa pemrograman"
- Menjelaskan kenapa kita pakai Java
- Membaca struktur dasar kode Java

## 🎮 Analogi Mobile Legends

Bayangkan kamu main Mobile Legends dan ingin hero-nya bergerak maju, pakai skill, atau recall ke base.

Di game, **kamu** tidak langsung menyentuh kode di dalam server. Kamu pencet tombol di layar, dan game memahami perintahmu: "hero maju", "pakai skill 1", "recall".

**Program** itu sama persis: sekumpulan **perintah** yang kita tulis supaya komputer melakukan sesuatu.

**Bahasa pemrograman** itu seperti **bahasa yang dipahami komputer** — sama seperti kamu harus "berbicara" dalam bahasa yang dipahami game (pencet tombol), kamu harus menulis perintah dalam bahasa yang dipahami komputer.

Masalahnya: komputer sebenarnya cuma paham angka 0 dan 1 (binary). Manusia susah menulis 0 dan 1.

**Java** adalah "penerjemah" di tengahnya: kamu menulis kata-kata yang mirip bahasa Inggris, lalu Java menerjemahkannya jadi 0 dan 1 yang dimengerti komputer.

```
Kamu  →  tulis kode Java (mudah dibaca manusia)
         ↓  Java menerjemahkan (compile)
Komputer  →  0 dan 1 (binary)
```

> Analogi: MOONTON (pembuat Mobile Legends) menulis kode game, lalu game-nya dikemas jadi aplikasi yang bisa dijalankan HP kamu. Java melakukan hal mirip: kode → dikemas → bisa dijalankan.

## 📖 Materi

### 1. Apa itu program?

**Program** = daftar perintah yang dikerjakan komputer **satu per satu dari atas ke bawah**.

Contoh program sederhana dalam bahasa manusia:

```
1. Tampilkan "Selamat datang"
2. Tampilkan "Pilih hero"
3. Selesai
```

Komputer tidak bisa menebak-nebak. Ia butuh perintah **eksplisit dan urut**.

### 2. Kenapa Java?

- Banyak dipakai di dunia kerja (aplikasi Android, backend, sistem perusahaan)
- Dipakai di kampus Sistem Informasi — kamu "curi start" buat semester depan
- Terstruktur dan rapi, cocok buat belajar konsep dasar

### 3. Struktur dasar kode Java

Kita lihat dulu "kerangka" kode Java. **Jangan khawatir paham semuanya sekarang** — nanti tiap bagian dijelaskan di bab berikutnya.

```java
public class Main {
    public static void main(String[] args) {
        // perintah-perintah ditulis di sini
        System.out.println("Hello");
    }
}
```

Baca pelan-pelan:

| Bagian | Arti sederhana |
|--------|----------------|
| `public class Main` | Bikin "wadah" bernama `Main` (tentang `class` dibahas dalam di Bab 10) |
| `public static void main(...)` | **Titik mulai** program. Java selalu mulai dari sini |
| `{` dan `}` | Kurung kurawal. Menandai "isi" dari suatu bagian |
| `// ...` | Komentar. Dibiarkan diam oleh Java, buat catatan kita |
| `System.out.println(...)` | Perintah menampilkan teks ke layar |

### 4. Komputer itu patuh, tapi bodoh

Komputer akan **persis** mengikuti apa yang ditulis, bukan apa yang kamu *maksudkan*.

Kalau kamu salah ketik `System.out.prinln` (kurang satu `t`), komputer tidak akan "memahami maksudmu" — dia akan **error**.

> Sama seperti kalau di game kamu pencet tombol yang salah: hero-nya ngelakuin hal yang salah. Komputer tidak bisa "nebak".

### 5. Kompilasi (compile)

Java itu bahasa yang **diterjemahkan dulu** sebelum dijalankan.

- Kamu menulis kode di file `.java`
- Java **meng-compile** (menerjemahkan) jadi file yang bisa dijalankan
- Baru program berjalan

Kabar baiknya: di VS Code dengan extension Code Runner, ini **otomatis**. Kamu tinggal pencet tombol ▶.

## 💪 Latihan

### Soal 1
Sebutkan dengan kata-katamu sendiri: apa bedanya "program" dengan "bahasa pemrograman"?

### Soal 2
Dalam kode Java berikut, **bagian mana** yang menjadi titik mulai program?

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Halo");
    }
}
```

### Soal 3
Kenapa kalau kita salah ketik satu huruf saja, program bisa error? Jelaskan pakai analogi Mobile Legends.

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**
Program = daftar perintah yang dikerjakan komputer. Bahasa pemrograman = bahasa/tata cara yang dipakai untuk menulis perintah itu supaya dipahami komputer.

**Soal 2**
Bagian titik mulai adalah `public static void main(String[] args)`. Java selalu mulai mengeksekusi dari method `main`.

**Soal 3**
Komputer tidak bisa menebak maksud kita. Ia hanya mengikuti persis apa yang ditulis. Sama seperti kalau kita pencet tombol yang salah di game, hero melakukan hal yang salah — komputer tidak "mengerti maksud", hanya "mengikuti perintah". Salah ketik = perintah tidak dikenal = error.

</details>
