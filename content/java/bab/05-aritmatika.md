# Bab 5 — Aritmatika & Operator

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Melakukan hitungan `+ - * / %` di Java
- Memahami urutan operasi
- Memahami increment (`++`) dan gabungan operator (`+=`)

## 🎮 Analogi Mobile Legends

Di dalam game, angka-angka selalu dihitung otomatis:

- Hero kena damage → **HP berkurang**
- Beli item → **gold berkurang**, damage naik
- Serangan critical → damage dihitung dengan **perkalian**

Program Java bisa melakukan hitungan yang sama. Kamu sudah mencoba satu operasi di Soal 2 Bab 4: `sisaHp = hpAwal - damage`.

Sekarang kita pelajari semua operator hitung.

## 📖 Materi

### 1. Operator dasar

| Operator | Arti | Contoh | Hasil |
|----------|------|--------|-------|
| `+` | tambah | `5 + 3` | `8` |
| `-` | kurang | `5 - 3` | `2` |
| `*` | kali | `5 * 3` | `15` |
| `/` | bagi | `6 / 3` | `2` |
| `%` | sisa bagi (modulo) | `7 % 3` | `1` |

```java
int hp = 2600;
int damage = 750;
int sisa = hp - damage;
System.out.println(sisa);  // 1850

int totalDamage = 120 * 3;   // 360
int goldPerMin = 800 / 4;    // 200
```

### 2. Perangkap pembagian `int`

Bagian ini sering bikin bingung. Kalau **dua-duanya `int`**, hasil pembagian dibulatkan ke bawah (desimal dibuang):

```java
int a = 7;
int b = 2;

System.out.println(a / b);  // 3   (bukan 3.5!)
```

Kenapa? Karena `int` cuma bisa menyimpan bilangan bulat.

Supaya hasilnya desimal, minimal salah satunya harus `double`:

```java
double a = 7;
int b = 2;

System.out.println(a / b);  // 3.5
```

> **Aturan praktis:** kalau mau hasil bagi yang akurat (ada desimalnya), gunakan `double`.

### 3. `%` (modulo) — sisa bagi

Modulo memberi **sisa pembagian**.

```java
System.out.println(7 % 3);  // 1   (7 dibagi 3 = 2 sisa 1)
System.out.println(10 % 5); // 0   (habis, sisa 0)
System.out.println(8 % 3);  // 2
```

> Cara gampang: `7 % 3` artinya "7 dibagi 3, sisa berapa?". 7 = 3+3+1, jadi sisa 1.

Modulo berguna banget di game: cek angka **genap/ganjil**, atau bikin efek "setiap kill ke-3 ada bonus".

### 4. Urutan operasi (seperti matematika)

Java mengikuti aturan matematika biasa (BEDMAS / "kali bagi dulu, baru tambah kurang"):

```java
int hasil = 2 + 3 * 4;   // 14 (3*4 = 12, lalu +2)
```

Kalau mau memaksa urutan, pakai **tanda kurung**:

```java
int hasil = (2 + 3) * 4; // 20 (2+3 = 5, lalu *4)
```

### 5. Increment `++` dan decrement `--`

Sering banget nambah 1. Java punya jalan pintas:

```java
int kill = 5;
kill++;          // kill jadi 6
System.out.println(kill);  // 6

kill--;          // kill jadi 5
```

> `kill++` sama artinya dengan `kill = kill + 1`.

### 6. Operator gabungan `+=`, `-=`, dst.

Kalau mau tambah nilai tertentu:

```java
int gold = 1000;
gold += 500;     // gold = gold + 500 → 1500
gold -= 200;     // gold = gold - 200 → 1300
gold *= 2;       // gold = gold * 2   → 2600
```

Ini jembatan dari yang sudah kita pelajari:

- `gold = gold + 500` → versi pendeknya `gold += 500`

### 7. Gabungan angka dan teks (concatenation)

Kalau `+` dipakai dengan teks, artinya bukan "tambah" tapi "sambung":

```java
System.out.println("Kill: " + 3);   // "Kill: 3"
```

Catatan: `"Kill: " + 3` menghasilkan teks `Kill: 3`, karena salah satu sisi sudah teks.

## 💪 Latihan

### Soal 1
Buat program yang menghitung **total damage** 3 skill berturut-turut. Input damage skill 1, 2, 3 (int), lalu tampilkan totalnya.

### Soal 2
Hero dapat bonus **20%** dari damage dasar. Buat program: input damage dasar (double), hitung bonus, tampilkan damage total (dasar + bonus).

Contoh run:

```
Damage dasar: 500
Bonus 20%: 100.0
Damage total: 600.0
```

### Soal 3
Input angka (int), lalu tampilkan apakah angkanya **genap atau ganjil** pakai `%`. (Programnya cukup tampilkan hasil `angka % 2` dulu — logika `if/else`-nya nanti di Bab 6.)

Tebak dulu: `7 % 2` hasilnya berapa? `8 % 2`?

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Damage skill 1: ");
        int s1 = input.nextInt();
        System.out.print("Damage skill 2: ");
        int s2 = input.nextInt();
        System.out.print("Damage skill 3: ");
        int s3 = input.nextInt();

        int total = s1 + s2 + s3;
        System.out.println("Total damage: " + total);
    }
}
```

**Soal 2**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Damage dasar: ");
        double dasar = input.nextDouble();

        double bonus = dasar * 0.20;
        double total = dasar + bonus;

        System.out.println("Bonus 20%: " + bonus);
        System.out.println("Damage total: " + total);
    }
}
```

**Soal 3**
`7 % 2` = 1 (ganjil), `8 % 2` = 0 (genap).

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Angka: ");
        int angka = input.nextInt();

        System.out.println("Sisa bagi 2: " + angka % 2);
        // 0 = genap, 1 = ganjil
    }
}
```

</details>
