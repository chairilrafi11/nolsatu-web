# Bab 3 — Hello World (Program Pertamamu)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membuat file `.java`
- Menampilkan teks ke layar dengan `System.out.println`
- Menjalankan program di VS Code

## 🎮 Analogi Mobile Legends

Ingat layar "loading" Mobile Legends saat masuk game? Di layar itu tertulis teks-teks seperti "Connecting...", "Loading 75%...", lalu "Welcome back!".

Teks-teks itu **ditampilkan program** ke layar. Sekarang kita bikin program paling sederhana yang menampilkan teks — ini langkah pertama semua orang yang belajar coding, di seluruh dunia.

Program pertamamu akan menampilkan:

```
Hello, World!
```

## 📖 Materi

### 1. Buat file baru di VS Code

1. Buka VS Code
2. Buka folder `java-course` ini
3. Klik kanan di panel kiri → **New File**
4. Beri nama **`Hello.java`** — perhatikan: huruf besar di depan, dan akhiran `.java`

> Nama file harus **sama persis** dengan nama class di dalamnya. Kalau file `Hello.java`, class di dalamnya harus `Hello`.

### 2. Ketik kode ini

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

### 3. Jalankan

- Cara 1: klik tombol ▶ (Run) di pojok kanan atas VS Code
- Cara 2: tekan `Ctrl + Alt + N` (Mac: `Cmd + Option + N`)

Hasilnya di panel bawah:

```
Hello, World!
```

Selamat, kamu baru saja bikin program pertamamu! 🎉

### 4. Bedah `System.out.println`

```java
System.out.println("Hello, World!");
```

| Bagian | Arti |
|--------|------|
| `System.out` | "layar" (console/terminal) |
| `.println(...)` | perintah "tampilkan lalu pindah ke baris baru" |
| `"Hello, World!"` | teks yang mau ditampilkan |

Perhatikan: teks yang ditampilkan selalu **di dalam tanda kutip**.

### 5. `println` vs `print`

- `println` → tampilkan lalu **turun ke baris baru**
- `print` → tampilkan **tanpa turun baris**

```java
System.out.println("Halo");
System.out.println("Dunia");
// Output:
// Halo
// Dunia

System.out.print("Halo ");
System.out.print("Dunia");
// Output:
// Halo Dunia  (satu baris!)
```

### 6. Cetak nilai variabel

`println` bisa menampilkan teks, angka, bahkan variabel:

```java
String nama = "Layla";
int level = 10;

System.out.println(nama);      // Layla
System.out.println(level);     // 10
System.out.println("Hero: " + nama + " level " + level);
// Hero: Layla level 10
```

Tanda `+` di dalam `println` menggabungkan teks (disebut **concat**). Nanti kita bahasa lagi di Bab 5.

### 7. Error yang sering muncul

| Error | Penyebab |
|-------|----------|
| `cannot find symbol` | Salah ketik nama (misal `prinln`) |
| `; expected` | Lupa titik koma `;` di akhir perintah |
| `class Hello is public, should be declared in a file named Hello.java` | Nama file beda dengan nama class |

**Setiap error itu bagian dari belajar.** Baca pesan errornya — pesan itu memberi tahu lokasi & penyebabnya.

## 💪 Latihan

### Soal 1
Buat program yang menampilkan nama panggilanmu dan satu hero favoritmu, di **dua baris** yang berbeda.

### Soal 2
Kira-kira apa output dari kode ini? (Tebak dulu sebelum menjalankan!)

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Epic ");
        System.out.println("Comeback");
    }
}
```

### Soal 3
Program ini error. Cari apa yang salah.

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Halo Dunia")
    }
}
```

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
public class NamaSaya {
    public static void main(String[] args) {
        System.out.println("Budi");
        System.out.println("Layla");
    }
}
```

(Jangan lupa: nama file harus sama dengan nama class, misal `NamaSaya.java`.)

**Soal 2**
Outputnya satu baris: `Epic Comeback`.
Karena `print` tidak turun baris, sedangkan `println` turun baris setelah teksnya.

**Soal 3**
Baris `System.out.println("Halo Dunia")` tidak diakhiri titik koma `;`. Setiap perintah di Java diakhiri `;`. Perbaiki menjadi:

```java
System.out.println("Halo Dunia");
```

</details>
