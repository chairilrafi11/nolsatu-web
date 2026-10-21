# Bab 5 — Perulangan (for / while)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Mengulang perintah dengan `for` dan `while`
- Menghentikan perulangan lebih awal dengan `break`
- Melewati satu putaran dengan `continue`

## 🎮 Analogi

Minion di Mobile Legends tidak muncul sekali. Mereka datang bergelombang, terus-menerus, sampai
base hancur. Kamu tidak menulis "spawn minion" seratus kali — kamu menulis **aturan** kapan mereka
muncul.

Perulangan adalah aturan itu.

## 📖 Materi

### 1. `for` — jumlah putaran diketahui

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 5; i++) {
        printf("Minion wave %d\n", i);
    }
    return 0;
}
```

Tiga bagian di dalam `for`:

| Bagian | Arti |
|---|---|
| `int i = 1` | mulai dari 1 |
| `i <= 5` | ulang selama i masih ≤ 5 |
| `i++` | setiap putaran, tambah 1 |

C membaca urutannya: mulai → cek kondisi → jalankan isi → tambah → cek lagi.

### 2. `while` — berhenti berdasarkan kondisi

```c
int hpBos = 100;

while (hpBos > 0) {
    printf("Serang! Sisa HP: %d\n", hpBos);
    hpBos -= 30;
}
printf("Bos tumbang\n");
```

Kamu tidak tahu pasti berapa putaran; kamu hanya tahu **kapan berhenti**.

### 3. `do-while` — minimal sekali

```c
int pilihan;

do {
    printf("Pilih menu (1-3): ");
    scanf("%d", &pilihan);
} while (pilihan < 1 || pilihan > 3);
```

Isi selalu dijalankan sekali, baru kondisi dicek.

### 4. `break` dan `continue`

```c
for (int i = 1; i <= 10; i++) {
    if (i == 5) break;       // berhenti total
    if (i % 2 == 0) continue; // lewati yang genap
    printf("%d\n", i);
}
```

Output: `1 3` lalu berhenti karena `break` di `i == 5`.

### 5. Hati-hati perulangan tak berujung

```c
int i = 1;
while (i <= 5) {
    printf("%d\n", i);
    // lupa i++ → loop selamanya
}
```

Kalau program tidak berhenti, tekan `Ctrl+C` di terminal. Jangan panik, itu bukan kerusakan.

## 💪 Latihan

### Soal 1
Cetak angka 1 sampai 10, satu per baris.

### Soal 2
Cetak angka genap dari 2 sampai 20.

### Soal 3
Hitung jumlah 1 + 2 + ... + 100, lalu cetak hasilnya.

### Soal 4
Minta angka terus sampai user memasukkan `0`. Setelah itu cetak berapa angka yang dimasukkan
(tidak termasuk 0).

<details>
<summary>Kunci jawaban</summary>

**Soal 1**

```c
#include <stdio.h>

int main(void) {
    for (int i = 1; i <= 10; i++) {
        printf("%d\n", i);
    }
    return 0;
}
```

**Soal 2**

```c
#include <stdio.h>

int main(void) {
    for (int i = 2; i <= 20; i += 2) {
        printf("%d\n", i);
    }
    return 0;
}
```

**Soal 3**

```c
#include <stdio.h>

int main(void) {
    int total = 0;

    for (int i = 1; i <= 100; i++) {
        total += i;
    }
    printf("Jumlah: %d\n", total); // 5050
    return 0;
}
```

**Soal 4**

```c
#include <stdio.h>

int main(void) {
    int angka;
    int jumlah = 0;

    while (1) {
        printf("Masukkan angka (0 untuk selesai): ");
        scanf("%d", &angka);
        if (angka == 0) break;
        jumlah++;
    }
    printf("Kamu memasukkan %d angka\n", jumlah);
    return 0;
}
```

</details>
