# Bab 1 — Kenalan dengan C

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Menjelaskan kenapa C masih dipakai walaupun sudah tua
- Menulis, meng-compile, dan menjalankan program C pertama
- Membaca struktur dasar sebuah file `.c`

## 🎮 Analogi

Java itu seperti naik mobil matic: kamu tekan gas, mobil jalan, dan banyak hal diurus otomatis.
C itu seperti naik mobil manual: kamu harus tahu kapan gigi berpindah, tapi kamu **merasakan**
langsung bagaimana mesin bekerja.

Kalau nanti kamu belajar sistem operasi, database, atau bahasa lain, kamu akan sering menemukan
C di fondasinya. Belajar C bukan karena modern, tapi karena **transparan**.

## 📖 Materi

### 1. Program pertama

Buat file `main.c`:

```c
#include <stdio.h>

int main(void) {
    printf("Halo dari C!\n");
    return 0;
}
```

Baca pelan-pelan:

| Bagian | Arti sederhana |
|--------|----------------|
| `#include <stdio.h>` | Ambil "kotak peralatan" input/output (termasuk `printf`) |
| `int main(void)` | Titik mulai program. `int` artinya program mengembalikan angka |
| `{` dan `}` | Menandai isi fungsi |
| `printf("...")` | Cetak teks ke layar |
| `\n` | Pindah ke baris baru |
| `return 0;` | Lapor ke sistem: program selesai tanpa masalah |

### 2. Compile dan jalankan

Java punya `javac` lalu `java`. C punya satu langkah:

```bash
gcc main.c -o main
./main
```

- `gcc main.c` → compiler membaca kodemu
- `-o main` → hasilnya diberi nama `main`
- `./main` → jalankan hasilnya

Kalau muncul error, baca dari **baris paling atas**. Error pertama biasanya penyebab sisanya.

### 3. Setiap perintah butuh titik koma

```c
printf("Halo\n")
printf("Dunia\n")
```

Ini error. C sangat ketat: setiap pernyataan diakhiri `;`.

```c
printf("Halo\n");
printf("Dunia\n");
```

### 4. C tidak memaafkan tebakan

Di Java, salah tipe data kadang masih "dimengerti". Di C, kamu bertanggung jawab penuh.
Ini yang membuat C bagus untuk memahami mesin, dan berbahaya kalau asal-asalan.

> Aturan main: kalau compiler marah, jangan menebak. Baca pesannya, cari barisnya, pahami.

## 💪 Latihan

### Soal 1
Tulis program yang menampilkan tiga baris:

```
Halo dari C!
Saya sedang belajar.
Baris ketiga.
```

### Soal 2
Ubah program di atas supaya ada satu baris kosong di antara baris pertama dan kedua.

### Soal 3
Apa yang terjadi kalau kamu menghapus `;` di akhir `printf`? Coba, lalu jelaskan pesan error-nya
dengan kata-katamu sendiri.

<details>
<summary>Kunci jawaban</summary>

**Soal 1**

```c
#include <stdio.h>

int main(void) {
    printf("Halo dari C!\n");
    printf("Saya sedang belajar.\n");
    printf("Baris ketiga.\n");
    return 0;
}
```

**Soal 2**

```c
#include <stdio.h>

int main(void) {
    printf("Halo dari C!\n");
    printf("\n");
    printf("Saya sedang belajar.\n");
    printf("Baris ketiga.\n");
    return 0;
}
```

**Soal 3**

Compiler memberi pesan seperti `expected ';' before ...` dan menunjuk baris `printf`.
Artinya: compiler sudah selesai membaca satu perintah, tapi tidak menemukan penutupnya.
Tambahkan `;` di akhir baris tersebut.

</details>

---

Bab berikutnya: variabel dan tipe data di C.
