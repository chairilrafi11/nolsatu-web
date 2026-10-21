# Bab 6 — Array

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menyimpan banyak nilai dalam satu variabel
- Mengakses elemen array lewat index
- Mengulang isi array dengan `for`

## 🎮 Analogi

Satu tim Mobile Legends berisi 5 hero. Kamu tidak membuat variabel `hero1`, `hero2`, `hero3`,
`hero4`, `hero5` — kamu punya **satu daftar** berisi lima slot.

Array adalah daftar itu: satu nama, banyak slot, dan setiap slot punya nomor.

## 📖 Materi

### 1. Membuat array

```c
#include <stdio.h>

int main(void) {
    int hp[5] = {2600, 3100, 2400, 2800, 2200};

    printf("HP hero pertama: %d\n", hp[0]);
    printf("HP hero ketiga: %d\n", hp[2]);
    return 0;
}
```

Penting: index mulai dari **0**, bukan 1.

| Index | Nilai |
|---|---|
| 0 | 2600 |
| 1 | 3100 |
| 2 | 2400 |
| 3 | 2800 |
| 4 | 2200 |

`hp[5]` **tidak ada**. Array berukuran 5 hanya punya index 0–4.

### 2. Mengisi dan mengubah

```c
int hp[5];

hp[0] = 2600;
hp[1] = 3100;

hp[1] = 1500; // ubah nilai slot 1
```

### 3. Mengulang array

```c
int hp[5] = {2600, 3100, 2400, 2800, 2200};

for (int i = 0; i < 5; i++) {
    printf("Hero %d: %d HP\n", i + 1, hp[i]);
}
```

Perhatikan `i < 5`, bukan `i <= 5`. Kalau `<=`, terakhir kamu membaca `hp[5]` yang tidak ada.

### 4. Ukuran array dihitung, bukan ditebak

```c
int hp[5] = {2600, 3100, 2400, 2800, 2200};
int jumlah = sizeof(hp) / sizeof(hp[0]); // 5

for (int i = 0; i < jumlah; i++) {
    printf("%d\n", hp[i]);
}
```

Ini berguna kalau nanti ukurannya berubah — kamu tidak perlu mengubah angka 5 di banyak tempat.

### 5. Bahaya keluar batas

C **tidak** menghentikanmu saat membaca `hp[99]`. Dia akan membaca memori yang bukan miliknya.
Hasilnya bisa angka acak, atau program crash. Ini salah satu alasan C dianggap "tidak aman" —
karena kebebasannya, bukan karena rusak.

> Aturan: pastikan index selalu `< jumlah elemen`.

## 💪 Latihan

### Soal 1
Buat array berisi 5 nilai ujian, lalu cetak semuanya berurutan.

### Soal 2
Dari array yang sama, hitung rata-ratanya.

### Soal 3
Cari nilai terbesar dalam array dan cetak.

### Soal 4
Cetak isi array secara terbalik (dari index terakhir ke 0).

<details>
<summary>Kunci jawaban</summary>

**Soal 1**

```c
#include <stdio.h>

int main(void) {
    int nilai[5] = {80, 75, 92, 60, 88};

    for (int i = 0; i < 5; i++) {
        printf("Nilai %d: %d\n", i + 1, nilai[i]);
    }
    return 0;
}
```

**Soal 2**

```c
#include <stdio.h>

int main(void) {
    int nilai[5] = {80, 75, 92, 60, 88};
    int total = 0;

    for (int i = 0; i < 5; i++) {
        total += nilai[i];
    }
    printf("Rata-rata: %.1f\n", (double)total / 5);
    return 0;
}
```

**Soal 3**

```c
#include <stdio.h>

int main(void) {
    int nilai[5] = {80, 75, 92, 60, 88};
    int terbesar = nilai[0];

    for (int i = 1; i < 5; i++) {
        if (nilai[i] > terbesar) {
            terbesar = nilai[i];
        }
    }
    printf("Nilai terbesar: %d\n", terbesar);
    return 0;
}
```

**Soal 4**

```c
#include <stdio.h>

int main(void) {
    int nilai[5] = {80, 75, 92, 60, 88};

    for (int i = 4; i >= 0; i--) {
        printf("%d\n", nilai[i]);
    }
    return 0;
}
```

</details>
