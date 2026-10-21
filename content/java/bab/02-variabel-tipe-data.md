# Bab 2 — Variabel & Tipe Data

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menjelaskan apa itu variabel
- Menyebut 4 tipe data dasar (`int`, `double`, `String`, `boolean`)
- Membuat variabel dan mengubah nilainya

## 🎮 Analogi Mobile Legends

Lihat hero Layla di game. Layla punya:

- **nama**: "Layla"
- **HP**: misal 2600
- **damage**: misal 120
- **lagi hidup / mati**: hidup (true/false)

Semua itu **informasi yang disimpan** di dalam game. Game butuh tempat untuk menyimpan angka HP Layla supaya bisa mengurangi HP-nya kalau kena serangan.

Di koding, **tempat penyimpanan** itu namanya **variabel**.

> Variabel = kotak berlabel untuk menyimpan satu nilai.
> Labelnya (nama) yang kamu tentukan, isinya (nilai) yang bisa berubah.

Contoh: kotak berlabel `hpLayla` berisi `2600`. Kalau Layla kena damage 300, isinya jadi `2300`. **Nilai berubah, label tetap.**

## 📖 Materi

### 1. Cara membuat variabel

Rumusnya:

```java
tipeData namaVariabel = nilai;
```

Contoh:

```java
int hpLayla = 2600;
```

Dibaca: "buat variabel bertipe `int` (bilangan bulat) bernama `hpLayla`, isi dengan 2600".

### 2. Tipe data utama

Tipe data menentukan **jenis nilai** yang boleh disimpan di variabel.

| Tipe | Menyimpan | Contoh |
|------|-----------|--------|
| `int` | bilangan bulat | `2600`, `-5`, `0` |
| `double` | bilangan desimal (koma) | `3.14`, `120.5` |
| `String` | teks | `"Layla"`, `"GG"` |
| `boolean` | benar/salah | `true`, `false` |

Penting:
- `String` pakai tanda kutip `"..."` (huruf S besar ya)
- `boolean` cuma dua nilai: `true` atau `false`
- `double` pakai titik, bukan koma: `3.14` bukan `3,14`

### 3. Contoh lengkap

```java
public class Main {
    public static void main(String[] args) {
        String namaHero = "Layla";
        int hp = 2600;
        double damage = 120.5;
        boolean masihHidup = true;

        System.out.println(namaHero);
        System.out.println(hp);
        System.out.println(damage);
        System.out.println(masihHidup);
    }
}
```

Output:

```
Layla
2600
120.5
true
```

> Perhatikan: saat `println(namaHero)`, yang tampil adalah **isi** kotaknya ("Layla"), bukan labelnya.

### 4. Mengubah nilai variabel

Isi kotak bisa diganti kapan saja.

```java
int hp = 2600;
hp = 2300;          // kena damage, ganti isi
System.out.println(hp);   // tampil 2300
```

> Kalau ngganti nilai, **tidak perlu** tulis tipe data lagi. Cukup `hp = 2300`. Tipe `int` cuma ditulis sekali saat pertama kali dibuat.

### 5. Aturan penamaan variabel

- Jangan pakai spasi: pakai `namaHero` bukan `nama hero`
- Kebiasaan Java: huruf kecil di awal, lalu tiap kata baru huruf besar (disebut **camelCase**)
  - `hpLayla`, `jumlahKill`, `namaHero`
- Nama harus jelas artinya: `hp` lebih baik dari `x`

### 6. Tipe yang salah = error

Kamu tidak bisa memasukkan teks ke kotak yang bertipe angka.

```java
int hp = "Layla";   // ERROR: int tidak bisa berisi teks
```

Setiap kotak punya "jenis" yang tetap. Ini namanya Java itu **statically typed** — jangan dihafal istilahnya dulu, cukup ingat: **tipe harus cocok**.

## 💪 Latihan

### Soal 1
Buat variabel-variabel berikut (tipe yang tepat!):
- nama hero: "Balmond"
- jumlah kill: 10
- win rate (desimal): 52.5
- apakah MVP: true

Lalu tampilkan semuanya dengan `println`.

### Soal 2
Ada kode ini. Apa yang tampil di layar?

```java
int gold = 1000;
gold = 1500;
gold = gold + 200;
System.out.println(gold);
```

### Soal 3
Kenapa kode ini error?

```java
int hp = 2600;
hp = "banyak";
```

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
public class Main {
    public static void main(String[] args) {
        String namaHero = "Balmond";
        int jumlahKill = 10;
        double winRate = 52.5;
        boolean isMvp = true;

        System.out.println(namaHero);
        System.out.println(jumlahKill);
        System.out.println(winRate);
        System.out.println(isMvp);
    }
}
```

**Soal 2**
Tampil `1700`.
Penjelasan: `gold` mulai 1000 → diganti 1500 → `gold + 200` = 1500 + 200 = 1700.

**Soal 3**
Karena variabel `hp` bertipe `int` (angka bulat), tapi diisi teks `"banyak"`. Tipe tidak cocok. Sekali variabel dibuat sebagai `int`, isinya harus selalu angka.

</details>
