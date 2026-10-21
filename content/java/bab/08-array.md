# Bab 8 — Array (Kumpulan Data)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membuat array dan mengisinya
- Mengakses isi array pakai **indeks**
- Melintasi array dengan loop

## 🎮 Analogi Mobile Legends

Satu tim Mobile Legends terdiri dari **5 hero**. Kalau kita mau simpan nama 5 hero:

```java
String hero1 = "Layla";
String hero2 = "Balmond";
String hero3 = "Gusion";
String hero4 = "Tigreal";
String hero5 = "Nana";
```

Masalahnya: kalau timnya 10 orang? 50 orang? Buat 50 variabel itu merepotkan banget.

Solusinya: **array** — satu variabel yang bisa menyimpan **banyak nilai sekaligus**.

> Array = deretan kotak berlabel yang semuanya punya nama yang sama, dan tiap kotak punya **nomor indeks**.

```
Nama array: lineup

Indeks:    [0]      [1]       [2]       [3]        [4]
Isi:      "Layla"  "Balmond" "Gusion"  "Tigreal"  "Nana"
```

> **Catatan penting:** indeks array mulai dari **0**, bukan 1! Kotak pertama = indeks 0.

## 📖 Materi

### 1. Membuat array

```java
String[] lineup = {"Layla", "Balmond", "Gusion", "Tigreal", "Nana"};
```

- `String[]` → "array berisi String"
- `{...}` → daftar isinya, dipisah koma

Array angka:

```java
int[] damage = {120, 95, 200, 150, 80};
```

Cara lain (isi kosong, isi belakangan):

```java
int[] hp = new int[5];   // array 5 kotak, semuanya 0
```

### 2. Mengakses isi array (indeks)

```java
String[] lineup = {"Layla", "Balmond", "Gusion", "Tigreal", "Nana"};

System.out.println(lineup[0]);  // Layla
System.out.println(lineup[2]);  // Gusion
System.out.println(lineup[4]);  // Nana
```

Mengubah isi:

```java
lineup[1] = "Chou";   // ganti Balmond jadi Chou
System.out.println(lineup[1]);  // Chou
```

### 3. Jumlah isi: `.length`

```java
String[] lineup = {"Layla", "Balmond", "Gusion", "Tigreal", "Nana"};

System.out.println(lineup.length);  // 5
```

### 4. Error umum: indeks keluar batas

Indeks harus di antara `0` sampai `length - 1`.

```java
System.out.println(lineup[5]);   // ERROR: cuma ada indeks 0-4
```

> Ini seperti minta hero nomor 6 padahal timnya cuma 5 orang. Error-nya bernama `ArrayIndexOutOfBoundsException`. Ingat: **indeks terakhir = length - 1**.

### 5. Melintasi array dengan loop

Ini kombinasi paling penting: **loop + array**.

```java
String[] lineup = {"Layla", "Balmond", "Gusion", "Tigreal", "Nana"};

for (int i = 0; i < lineup.length; i++) {
    System.out.println("Hero " + i + ": " + lineup[i]);
}
```

Output:

```
Hero 0: Layla
Hero 1: Balmond
Hero 2: Gusion
Hero 3: Tigreal
Hero 4: Nana
```

Baca loop-nya: "`i` mulai 0, selama `i` masih kurang dari jumlah isi, tampilkan `lineup[i]`, lalu naikkan `i`."

### 6. For-each (baca saja, lebih simpel)

Kalau hanya **membaca** isi (tidak butuh indeks), ada versi pendek:

```java
for (String hero : lineup) {
    System.out.println(hero);
}
```

Dibaca: "untuk setiap `hero` di dalam `lineup`". Setiap putaran, `hero` berisi satu anggota lineup secara berurutan.

### 7. Mencari nilai terbesar

Pattern klasik: cari nilai maksimum di array.

```java
int[] damage = {120, 95, 200, 150, 80};

int tertinggi = damage[0];   // mulai dari yang pertama

for (int i = 1; i < damage.length; i++) {
    if (damage[i] > tertinggi) {
        tertinggi = damage[i];
    }
}

System.out.println("Damage tertinggi: " + tertinggi);  // 200
```

## 💪 Latihan

### Soal 1
Buat array `String` berisi 5 hero favoritmu, lalu tampilkan semua dengan `for` biasa (pakai indeks) dan tampilkan juga "jumlah hero: X".

### Soal 2
Input 5 angka (pakai `Scanner` + loop), simpan di array `int[]`, lalu tampilkan semuanya dan totalnya.

### Soal 3
Dari array `{5, 9, 3, 7, 2}`, tulis program yang menampilkan **nilai terkecil**.

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
public class Main {
    public static void main(String[] args) {
        String[] lineup = {"Layla", "Balmond", "Gusion", "Tigreal", "Nana"};

        for (int i = 0; i < lineup.length; i++) {
            System.out.println(lineup[i]);
        }

        System.out.println("Jumlah hero: " + lineup.length);
    }
}
```

**Soal 2**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int[] angka = new int[5];

        for (int i = 0; i < angka.length; i++) {
            System.out.print("Angka ke-" + (i + 1) + ": ");
            angka[i] = input.nextInt();
        }

        int total = 0;
        for (int i = 0; i < angka.length; i++) {
            total += angka[i];
            System.out.println("Angka ke-" + (i + 1) + ": " + angka[i]);
        }

        System.out.println("Total: " + total);
    }
}
```

**Soal 3**

```java
public class Main {
    public static void main(String[] args) {
        int[] angka = {5, 9, 3, 7, 2};

        int terkecil = angka[0];

        for (int i = 1; i < angka.length; i++) {
            if (angka[i] < terkecil) {
                terkecil = angka[i];
            }
        }

        System.out.println("Nilai terkecil: " + terkecil);  // 2
    }
}
```

</details>
