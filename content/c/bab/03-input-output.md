# Bab 3 — Input & Output di C

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membaca input dari keyboard dengan `scanf`
- Mencetak nilai yang sudah diformat
- Menghindari kesalahan umum saat membaca teks dan angka

## 🎮 Analogi

`printf` itu seperti hero yang **bicara**. `scanf` itu hero yang **mendengar**. Kalau kamu menyuruh
hero mendengar padahal kamu sedang bicara, tidak akan ada yang masuk.

Program yang baik selalu bergantian: cetak pertanyaan, tunggu jawaban, baru lanjut.

## 📖 Materi

### 1. Membaca angka

```c
#include <stdio.h>

int main(void) {
    int umur;

    printf("Masukkan umur: ");
    scanf("%d", &umur);

    printf("Umurmu %d tahun\n", umur);
    return 0;
}
```

Perhatikan `&umur`. Tanda `&` berarti "alamat variabel". `scanf` butuh alamat supaya bisa menulis
ke loker yang benar. Ini beda dengan `printf` yang cukup nilainya.

### 2. Membaca teks

```c
#include <stdio.h>

int main(void) {
    char nama[50];

    printf("Masukkan nama: ");
    scanf("%49s", nama);

    printf("Halo, %s!\n", nama);
    return 0;
}
```

- `char nama[50]` → ruang untuk 49 karakter + penutup
- `%49s` → batas jumlah karakter yang dibaca (mencegah buffer penuh)

`scanf` dengan `%s` berhenti di spasi. Kalau nama kamu dua kata, hanya kata pertama terbaca.

### 3. Membaca satu baris penuh

```c
#include <stdio.h>

int main(void) {
    char nama[50];

    printf("Masukkan nama lengkap: ");
    fgets(nama, sizeof(nama), stdin);

    printf("Halo, %s", nama);
    return 0;
}
```

`fgets` membaca sampai enter, termasuk enter-nya. Itu sebabnya output di atas bisa langsung pindah
baris tanpa `\n` tambahan.

### 4. Jangan campur `scanf` dan `fgets` tanpa hati-hati

Setelah `scanf("%d")`, tombol enter masih tertinggal di antrean. Kalau langsung `fgets`, dia akan
membaca enter itu dan terlihat seperti "tidak membaca apa-apa". Solusinya: baca sisa baris dulu
dengan `getchar()` dalam loop, atau gunakan `fgets` untuk semua input lalu ubah angkanya dengan
`sscanf`.

> Untuk pemula: pilih satu cara dan konsisten. Campur-campur input adalah sumber bug klasik.

## 💪 Latihan

### Soal 1
Minta umur, lalu cetak:

```
Tahun depan umurmu 20
```

(ganti 20 dengan umur + 1)

### Soal 2
Minta dua angka, lalu cetak jumlahnya.

### Soal 3
Minta nama lengkap (boleh dua kata), lalu cetak `Halo, <nama>!` dalam satu baris.

<details>
<summary>Kunci jawaban</summary>

**Soal 1**

```c
#include <stdio.h>

int main(void) {
    int umur;

    printf("Masukkan umur: ");
    scanf("%d", &umur);

    printf("Tahun depan umurmu %d\n", umur + 1);
    return 0;
}
```

**Soal 2**

```c
#include <stdio.h>

int main(void) {
    int a, b;

    printf("Angka pertama: ");
    scanf("%d", &a);
    printf("Angka kedua: ");
    scanf("%d", &b);

    printf("Jumlahnya %d\n", a + b);
    return 0;
}
```

**Soal 3**

```c
#include <stdio.h>

int main(void) {
    char nama[50];

    printf("Masukkan nama lengkap: ");
    fgets(nama, sizeof(nama), stdin);
    nama[0] = nama[0]; // tidak perlu diubah

    printf("Halo, %s", nama);
    return 0;
}
```

Kalau output jadi dua baris, artinya enter dari input ikut tercetak. Itu normal untuk `fgets`.
Kalau mau rapi dalam satu baris, hapus enter di akhir dengan mengganti `\n` menjadi `\0`.

</details>
