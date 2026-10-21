# Bab 7 — Perulangan (Loop)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Memahami `for`, `while`, dan `do-while`
- Menjalankan perintah berulang kali
- Menghentikan perulangan

## 🎮 Analogi Mobile Legends

Perhatikan minion di Mobile Legends. Minion **spawn terus-menerus** — gelombang demi gelombang — sampai salah satu base hancur.

Program tidak mau menulis "spawn minion" ratusan kali. Kita cukup tulis **sekali**, lalu bilang: "lakukan terus selama base belum hancur".

Itu namanya **perulangan (loop)**: mengerjakan perintah yang sama **berulang kali** secara otomatis.

## 📖 Materi

### 1. `for` — ulang dengan jumlah pasti

Kalau kamu **sudah tahu berapa kali** mau mengulang, pakai `for`.

Contoh: tampilkan "Minion wave" 3 kali.

```java
for (int i = 1; i <= 3; i++) {
    System.out.println("Minion wave " + i);
}
```

Output:

```
Minion wave 1
Minion wave 2
Minion wave 3
```

Bedah `for (int i = 1; i <= 3; i++)`:

| Bagian | Arti |
|--------|------|
| `int i = 1` | Mulai dari 1 (buat penghitung `i`) |
| `i <= 3` | Ulang selama `i` masih ≤ 3 |
| `i++` | Setiap selesai satu putaran, tambah 1 ke `i` |

Alurnya:
1. `i = 1` → cek `1 <= 3`? ya → tampilkan → `i` jadi 2
2. cek `2 <= 3`? ya → tampilkan → `i` jadi 3
3. cek `3 <= 3`? ya → tampilkan → `i` jadi 4
4. cek `4 <= 3`? **tidak** → berhenti

> `i` adalah nama umum untuk penghitung (singkatan "index"). Bisa juga `j`, `k`, atau nama lain, tapi `i` paling umum.

### 2. `while` — ulang selama kondisi benar

Kalau kamu **tidak tahu pasti berapa kali** (hanya tahu kapan berhenti), pakai `while`.

Contoh game: hero spawn minion terus selama HP base masih di atas 0.

```java
int hpBase = 5;

while (hpBase > 0) {
    System.out.println("Minion spawn! Sisa HP base: " + hpBase);
    hpBase--;   // base terus diserang
}

System.out.println("Base hancur. Game over.");
```

Output:

```
Minion spawn! Sisa HP base: 5
Minion spawn! Sisa HP base: 4
Minion spawn! Sisa HP base: 3
Minion spawn! Sisa HP base: 2
Minion spawn! Sisa HP base: 1
Base hancur. Game over.
```

> **Perhatikan:** `hpBase--` di dalam loop memastikan nilainya berkurang. Kalau lupa mengurangi nilainya, `hpBase > 0` selalu benar → **loop tidak pernah berhenti** (infinite loop)!

### 3. `do-while` — jalankan minimal sekali

`do-while` bedanya: perintah **dijalankan dulu minimal sekali**, baru dicek kondisinya.

```java
int hpBase = 0;

do {
    System.out.println("Spawn minion!");
} while (hpBase > 0);
```

Output: `Spawn minion!` (tetap tampil sekali, padahal `hpBase = 0`).

Kenapa? Karena `do` dijalankan dulu, baru `while` dicek.

> `while` : cek dulu, baru jalan. Kalau kondisi salah dari awal → tidak jalan sama sekali.
> `do-while` : jalan dulu minimal sekali, baru cek.

### 4. `break` dan `continue`

- `break` → **keluar** dari loop seketika
- `continue` → **lompat** ke putaran berikutnya

Contoh `break`:

```java
for (int i = 1; i <= 10; i++) {
    if (i == 4) {
        break;   // berhenti total saat i = 4
    }
    System.out.println(i);
}
// Output: 1 2 3
```

Contoh `continue`:

```java
for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;  // lewati i = 3
    }
    System.out.println(i);
}
// Output: 1 2 4 5
```

### 5. Menghitung total di dalam loop

Loop sering dipakai untuk menjumlahkan. Contoh: total damage 5 serangan:

```java
int totalDamage = 0;

for (int i = 1; i <= 5; i++) {
    totalDamage += 100;   // tiap serangan 100 damage
}

System.out.println("Total damage: " + totalDamage);  // 500
```

## 💪 Latihan

### Soal 1
Pakai `for` untuk menampilkan angka 1 sampai 10, satu per baris.

### Soal 2
Pakai `while` untuk menampilkan hitung mundur (countdown) dari 5 sampai 1, lalu "GO!".

Output:

```
5
4
3
2
1
GO!
```

### Soal 3
Input angka N. Pakai `for` untuk menampilkan total penjumlahan `1 + 2 + ... + N`.

Contoh run:

```
Masukkan N: 5
Total: 15
```

(Petunjuk: gunakan variabel `total` yang ditambah terus di dalam loop.)

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            System.out.println(i);
        }
    }
}
```

**Soal 2**

```java
public class Main {
    public static void main(String[] args) {
        int angka = 5;

        while (angka >= 1) {
            System.out.println(angka);
            angka--;
        }

        System.out.println("GO!");
    }
}
```

**Soal 3**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Masukkan N: ");
        int n = input.nextInt();

        int total = 0;
        for (int i = 1; i <= n; i++) {
            total += i;
        }

        System.out.println("Total: " + total);
    }
}
```

</details>
