# Bab 4 — Percabangan (if / else)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membuat keputusan dengan `if`, `else if`, `else`
- Memakai operator perbandingan dan logika
- Menulis `switch` untuk pilihan yang banyak

## 🎮 Analogi

Di game, satu tombol bisa berarti banyak hal tergantung keadaan: kalau HP rendah, tombol heal;
kalau musuh dekat, tombol serang. Program juga begitu — dia memilih **satu** jalur, bukan semua.

## 📖 Materi

### 1. `if` sederhana

```c
#include <stdio.h>

int main(void) {
    int hp = 15;

    if (hp < 20) {
        printf("HP rendah, hati-hati!\n");
    }
    return 0;
}
```

Isi `{ }` hanya dijalankan kalau kondisi **benar**.

### 2. `if` / `else`

```c
int hp = 15;

if (hp > 0) {
    printf("Hero masih hidup\n");
} else {
    printf("Hero sudah tumbang\n");
}
```

### 3. `else if` untuk banyak kemungkinan

```c
int skor = 78;

if (skor >= 90) {
    printf("Grade A\n");
} else if (skor >= 75) {
    printf("Grade B\n");
} else if (skor >= 60) {
    printf("Grade C\n");
} else {
    printf("Belum lulus\n");
}
```

Urutan penting. Kalau `skor >= 60` ditaruh paling atas, semua nilai di atas 60 akan jadi C.

### 4. Operator perbandingan

| Operator | Arti |
|---|---|
| `==` | sama dengan (bukan `=`) |
| `!=` | tidak sama dengan |
| `>` `<` | lebih besar / kecil |
| `>=` `<=` | lebih besar/kecil atau sama |

Kesalahan klasik: menulis `if (hp = 0)`. Itu **mengisi** hp jadi 0, bukan membandingkan.
Compiler modern memberi peringatan, tapi jangan diandalkan.

### 5. Operator logika

```c
if (hp > 0 && punyaPotion) {
    printf("Bisa heal\n");
}

if (hp < 20 || musuhDekat) {
    printf("Ambil posisi aman\n");
}
```

`&&` = dan (keduanya harus benar), `||` = atau (salah satu benar), `!` = bukan.

### 6. `switch`

Kalau yang dicek adalah satu nilai dengan banyak pilihan:

```c
int pilihan = 2;

switch (pilihan) {
    case 1:
        printf("Pilih hero\n");
        break;
    case 2:
        printf("Mulai pertandingan\n");
        break;
    default:
        printf("Pilihan tidak dikenal\n");
}
```

Jangan lupa `break`. Tanpa `break`, program akan "jatuh" ke case berikutnya.

## 💪 Latihan

### Soal 1
Minta sebuah angka. Cetak `positif`, `negatif`, atau `nol`.

### Soal 2
Minta nilai ujian (0–100), lalu cetak grade:
- ≥ 90 → A
- ≥ 75 → B
- ≥ 60 → C
- di bawah 60 → D

### Soal 3
Minta angka 1–3, lalu cetak nama hero dengan `switch`:
1 → Layla, 2 → Gusion, 3 → Tigreal, lainnya → "Hero tidak tersedia".

<details>
<summary>Kunci jawaban</summary>

**Soal 1**

```c
#include <stdio.h>

int main(void) {
    int angka;

    printf("Masukkan angka: ");
    scanf("%d", &angka);

    if (angka > 0) {
        printf("positif\n");
    } else if (angka < 0) {
        printf("negatif\n");
    } else {
        printf("nol\n");
    }
    return 0;
}
```

**Soal 2**

```c
#include <stdio.h>

int main(void) {
    int nilai;

    printf("Masukkan nilai: ");
    scanf("%d", &nilai);

    if (nilai >= 90) {
        printf("Grade A\n");
    } else if (nilai >= 75) {
        printf("Grade B\n");
    } else if (nilai >= 60) {
        printf("Grade C\n");
    } else {
        printf("Grade D\n");
    }
    return 0;
}
```

**Soal 3**

```c
#include <stdio.h>

int main(void) {
    int pilihan;

    printf("Pilih hero (1-3): ");
    scanf("%d", &pilihan);

    switch (pilihan) {
        case 1:
            printf("Layla\n");
            break;
        case 2:
            printf("Gusion\n");
            break;
        case 3:
            printf("Tigreal\n");
            break;
        default:
            printf("Hero tidak tersedia\n");
    }
    return 0;
}
```

</details>
