# Bab 2 — Variabel & Tipe Data di C

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membuat variabel dengan tipe yang benar
- Membedakan `int`, `float`, `double`, dan `char`
- Mencetak nilai variabel dengan `printf`

## 🎮 Analogi

Bayangkan loker di sekolah. Setiap loker punya **ukuran** dan **label**. Kamu tidak bisa menaruh
tas gunung ke loker sepatu — muatannya beda.

Di C, tipe data adalah ukuran loker. Kalau salah pilih, isinya bisa terpotong atau kacau.

## 📖 Materi

### 1. Variabel itu loker bernama

```c
int hp = 2600;
float damage = 132.5f;
char kelas = 'A';
```

| Tipe | Isi | Contoh |
|------|-----|--------|
| `int` | bilangan bulat | `2600`, `-7`, `0` |
| `float` | desimal presisi sedang | `132.5f`, `0.25f` |
| `double` | desimal presisi lebih tinggi | `132.5`, `3.14159` |
| `char` | satu karakter | `'A'`, `'7'`, `'!'` |

Perhatikan: `char` memakai **kutip tunggal** (`'A'`), sedangkan teks memakai kutip ganda (`"A"`).

### 2. Mencetak nilai

```c
#include <stdio.h>

int main(void) {
    int hp = 2600;
    double damage = 132.5;

    printf("HP: %d\n", hp);
    printf("Damage: %.1f\n", damage);
    return 0;
}
```

- `%d` → tempat untuk bilangan bulat
- `%.1f` → tempat untuk desimal dengan 1 angka di belakang koma
- `%c` → tempat untuk satu karakter
- `%s` → tempat untuk teks

Kalau format tidak cocok dengan tipe, hasilnya bisa aneh. Ini kesalahan paling umum saat belajar C.

### 3. Kenapa `float` pakai `f`?

```c
float x = 1.5f;
```

Tanpa `f`, C menganggap angka desimal itu `double`. Compiler biasanya hanya memberi peringatan,
tapi lebih aman menulisnya benar sejak awal.

### 4. Mengubah nilai

```c
int level = 1;
level = level + 1;
level++;
```

`level++` sama dengan `level = level + 1`. Ini juga berlaku di Java.

## 💪 Latihan

### Soal 1
Buat variabel `nama` (teks), `umur` (bilangan bulat), dan `tinggi` (desimal).
Cetak semuanya dalam satu baris:

```
Kiki, 19 tahun, tinggi 162.5 cm
```

### Soal 2
Buat program yang menghitung total damage: `damage` dikali `hit`.
Gunakan `int` untuk keduanya, lalu cetak hasilnya.

### Soal 3
Apa yang terjadi kalau kamu mencetak `double` memakai `%d`? Coba dan jelaskan hasilnya.

<details>
<summary>Kunci jawaban</summary>

**Soal 1**

```c
#include <stdio.h>

int main(void) {
    char nama[] = "Kiki";
    int umur = 19;
    double tinggi = 162.5;

    printf("%s, %d tahun, tinggi %.1f cm\n", nama, umur, tinggi);
    return 0;
}
```

**Soal 2**

```c
#include <stdio.h>

int main(void) {
    int damage = 220;
    int hit = 3;
    int total = damage * hit;

    printf("Damage total: %d\n", total);
    return 0;
}
```

**Soal 3**

Hasilnya bukan angka yang kamu harapkan, bisa `0` atau bilangan acak. Penyebabnya: `%d` membaca
memori sebagai bilangan bulat, sedangkan `double` disimpan dengan cara berbeda. Ini contoh nyata
kenapa tipe dan format harus cocok di C.

</details>
