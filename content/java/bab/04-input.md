# Bab 4 — Input (Baca Data dari Pengguna)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membaca input dari pengguna dengan `Scanner`
- Memasukkan input ke variabel
- Membuat program yang interaktif (bertanya lalu menjawab)

## 🎮 Analogi Mobile Legends

Saat masuk lobby dan memilih hero, **kamu** yang menentukan hero apa. Game tidak tahu kamu mau pakai siapa sampai kamu **memilihnya**.

Sebelum bab ini, program kita selalu "diam": teksnya sudah ditulis di kode, tidak bisa berubah. Sekarang kita bikin program yang **bertanya ke pengguna**, lalu merespons sesuai jawabannya.

> Input = data yang **masuk** dari pengguna ke program.
> Lawannya output (`println`) = data yang **keluar** dari program ke pengguna.

```
Pengguna  --input-->  Program  --output-->  Pengguna
```

## 📖 Materi

### 1. Siapkan `Scanner`

`Scanner` adalah alat bawaan Java untuk membaca input. Cara pakainya:

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
    }
}
```

Penjelasan singkat (jangan dihafal dulu, cukup kenali polanya):
- `import java.util.Scanner;` → ambil alat Scanner dari "gudang" Java. **Harus ada di baris paling atas.**
- `Scanner input = new Scanner(System.in);` → bikin alat scanner bernama `input` yang membaca dari keyboard.

### 2. Membaca teks (`nextLine`)

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Pilih hero kamu: ");
        String hero = input.nextLine();

        System.out.println("Kamu memilih " + hero);
    }
}
```

Cara kerja saat dijalankan:

```
Pilih hero kamu: Layla
Kamu memilih Layla
```

Urutannya:
1. `print` menampilkan pertanyaan (tanpa turun baris, biar jawaban ngetik di baris yang sama)
2. `input.nextLine()` **berhenti dan menunggu** sampai pengguna mengetik lalu tekan Enter
3. Hasil ketikan disimpan ke variabel `hero`
4. Program menampilkan hasilnya

> `nextLine()` = baca satu baris teks.

### 3. Membaca angka

Ada beberapa cara membaca angka:

| Method | Membaca |
|--------|---------|
| `nextLine()` | teks (satu baris) |
| `nextInt()` | bilangan bulat (`int`) |
| `nextDouble()` | bilangan desimal (`double`) |

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Masukkan HP hero: ");
        int hp = input.nextInt();

        System.out.println("HP hero kamu: " + hp);
    }
}
```

### 4. Program lengkap: profil hero

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Nama hero: ");
        String nama = input.nextLine();

        System.out.print("Level: ");
        int level = input.nextInt();

        System.out.print("Damage (boleh desimal): ");
        double damage = input.nextDouble();

        System.out.println("===== PROFIL HERO =====");
        System.out.println("Nama   : " + nama);
        System.out.println("Level  : " + level);
        System.out.println("Damage : " + damage);
    }
}
```

### 5. Jebakan umum: campur `nextLine` dan `nextInt`

Kalau kamu membaca angka dulu, lalu teks, ada jebakan kecil:

```java
System.out.print("Level: ");
int level = input.nextInt();

System.out.print("Nama: ");
String nama = input.nextLine();   // INI KADANG LANGSUNG TERLEWAT
```

**Penyebab:** `nextInt()` tidak "memakan" tombol Enter. Sisa Enter itu langsung dianggap input oleh `nextLine()` berikutnya, jadi `nama` dapat teks kosong.

**Solusi sederhana:** setelah `nextInt()` atau `nextDouble()`, tambah satu baris `input.nextLine();` untuk "memakan" Enter yang tersisa.

```java
System.out.print("Level: ");
int level = input.nextInt();
input.nextLine();  // buang sisa Enter

System.out.print("Nama: ");
String nama = input.nextLine();   // sekarang normal
```

> Belum paham detailnya? Tidak masalah. Cukup ingat aturan praktisnya: **setelah baca angka, tambah `input.nextLine();`.**

### 6. Tutup scanner (opsional tapi rapi)

Di akhir program, boleh ditutup:

```java
input.close();
```

Ini kebiasaan baik, tapi buat sekarang tidak wajib. Kalau lupa, program tetap jalan.

## 💪 Latihan

### Soal 1
Buat program yang bertanya nama pengguna, lalu menyapa: `Halo <nama>, selamat datang di Land of Dawn!`

### Soal 2
Buat program kalkulator HP sederhana: minta input HP awal (int), lalu minta damage yang diterima (int), lalu tampilkan sisa HP.

Contoh run:

```
HP awal: 2600
Damage diterima: 750
Sisa HP: 1850
```

### Soal 3
Buat program yang minta input **nama hero** dan **jumlah kill**, lalu tampilkan kalimat: `<hero> telah mendapatkan <kill> kill!`

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Nama kamu: ");
        String nama = input.nextLine();

        System.out.println("Halo " + nama + ", selamat datang di Land of Dawn!");
    }
}
```

**Soal 2**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("HP awal: ");
        int hpAwal = input.nextInt();

        System.out.print("Damage diterima: ");
        int damage = input.nextInt();

        int sisaHp = hpAwal - damage;

        System.out.println("Sisa HP: " + sisaHp);
    }
}
```

**Soal 3**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Nama hero: ");
        String hero = input.nextLine();

        System.out.print("Jumlah kill: ");
        int kill = input.nextInt();

        System.out.println(hero + " telah mendapatkan " + kill + " kill!");
    }
}
```

</details>
