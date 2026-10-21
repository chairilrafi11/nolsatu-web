# Bab 6 — Percabangan (if / else)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Memahami `if`, `else if`, dan `else`
- Membandingkan nilai dengan operator pembanding
- Membuat program yang mengambil keputusan

## 🎮 Analogi Mobile Legends

Saat main Mobile Legends, kamu **terus-menerus mengambil keputusan**:

- **JIKA** musuh datang → kamu lari
- **JIKA** HP di bawah 30% → recall ke base
- **JIKA** level 4 → buka ultimate
- **JIKA TIDAK** → farming dulu

Selama ini program kita berjalan lurus dari atas ke bawah tanpa pilihan. Sekarang kita ajari program untuk **memilih** jalan berdasarkan kondisi.

Ini namanya **percabangan** — program "bercabang" ke arah yang berbeda tergantung kondisi.

## 📖 Materi

### 1. Operator pembanding

Sebelum `if`, kenalan dulu sama pembanding. Hasil pembanding selalu `boolean` (`true`/`false`).

| Operator | Arti | Contoh | Hasil |
|----------|------|--------|-------|
| `==` | sama dengan | `5 == 5` | `true` |
| `!=` | tidak sama | `5 != 5` | `false` |
| `>` | lebih dari | `5 > 3` | `true` |
| `<` | kurang dari | `5 < 3` | `false` |
| `>=` | lebih dari/sama | `5 >= 5` | `true` |
| `<=` | kurang dari/sama | `5 <= 3` | `false` |

> **PERHATIAN:** "sama dengan" pakai **dua** tanda sama `==`. Satu tanda `=` artinya *memberi nilai* (assignment), bukan membandingkan.

### 2. `if` — jalankan kalau kondisi benar

```java
int hp = 20;

if (hp < 30) {
    System.out.println("HP kritis! Recall dulu.");
}
```

Cara baca: **jika** `hp` kurang dari 30, **maka** tampilkan "HP kritis!".

- Kondisi ditulis di dalam `(...)`
- Perintah di dalam `{...}` hanya dijalankan kalau kondisi `true`
- Kalau kondisi `false`, blok `{...}` dilewati

Kalau `hp = 50`, pesan tidak akan muncul.

### 3. `else` — kalau tidak

```java
int hp = 80;

if (hp < 30) {
    System.out.println("HP kritis! Recall.");
} else {
    System.out.println("Aman, lanjut push.");
}
```

- Kalau kondisi `true` → jalankan blok `if`
- Kalau `false` → jalankan blok `else`

**Selalu salah satu yang jalan, tidak pernah dua-duanya.**

### 4. `else if` — pilihan bertingkat

Kalau keputusannya lebih dari dua:

```java
int level = 7;

if (level >= 15) {
    System.out.println("Hero sudah kuat, siap late game!");
} else if (level >= 8) {
    System.out.println("Mid game, fokus ambil objektif.");
} else {
    System.out.println("Early game, farming dulu.");
}
```

Cara kerja: dicek **dari atas ke bawah**, dan **berhenti di kondisi pertama yang benar**.

- `level = 7` → cek `>= 15`? false → cek `>= 8`? false → masuk `else`

> Penting: urutan kondisi menentukan hasil. Kalau `>= 8` ditulis duluan, logikanya akan berbeda. Pikirkan urutan cek dari yang paling spesifik/paling tinggi.

### 5. Gabungan kondisi: `&&` dan `||`

Kadang butuh dua syarat sekaligus.

| Operator | Arti | Contoh |
|----------|------|--------|
| `&&` | DAN (keduanya harus benar) | `hp < 30 && musuh == null` |
| `||` | ATAU (salah satu cukup) | `skill1Siap || skill2Siap` |
| `!` | BUKAN (membalik) | `!mati` |

```java
int hp = 25;
boolean ultimateSiap = true;

if (hp < 30 && ultimateSiap) {
    System.out.println("Combo pamungkas!");   // butuh DUA-duanya
}

if (hp < 30 || ultimateSiap) {
    System.out.println("Masih ada harapan."); // salah satu cukup
}
```

Contoh nyata di game:
- Recall kalau `hp < 30 && sedangTidakDikejar`
- Menyerang kalau `musuhTerlihat || menaraHancur`

### 6. `switch` — pilihan banyak dengan nilai pasti

Kalau banyak pilihan nilai yang pasti (bukan rentang), `switch` lebih rapi:

```java
int role = 2;

switch (role) {
    case 1:
        System.out.println("Tank");
        break;
    case 2:
        System.out.println("Marksman");
        break;
    case 3:
        System.out.println("Assassin");
        break;
    default:
        System.out.println("Role tidak dikenal");
}
```

- `switch(role)` → nilai yang dicek
- `case 1:` → kalau `role` bernilai 1, jalankan ini
- `break;` → keluar dari switch (jangan lupa!)
- `default:` → kalau tidak ada case yang cocok

Output: `Marksman`

> `if/else` lebih fleksibel (bisa rentang `>=`), `switch` lebih rapi untuk nilai-nilai pasti.

## 💪 Latihan

### Soal 1
Buat program: input umur. Kalau `>= 18` tampilkan "Boleh masuk", kalau tidak tampilkan "Maaf, belum cukup umur".

### Soal 2
Buat program hitung rank. Input win rate (int). Aturan:
- `>= 90` → "Mythic"
- `>= 70` → "Legend"
- `>= 50` → "Epic"
- selain itu → "Grandmaster"

### Soal 3
Buat program: input HP hero. Kalau HP `< 30` tampilkan "Recall", kalau HP `< 70` tampilkan "Hati-hati", selain itu tampilkan "Lanjut push".

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Umur: ");
        int umur = input.nextInt();

        if (umur >= 18) {
            System.out.println("Boleh masuk");
        } else {
            System.out.println("Maaf, belum cukup umur");
        }
    }
}
```

**Soal 2**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Win rate: ");
        int winRate = input.nextInt();

        if (winRate >= 90) {
            System.out.println("Mythic");
        } else if (winRate >= 70) {
            System.out.println("Legend");
        } else if (winRate >= 50) {
            System.out.println("Epic");
        } else {
            System.out.println("Grandmaster");
        }
    }
}
```

**Soal 3**

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("HP hero: ");
        int hp = input.nextInt();

        if (hp < 30) {
            System.out.println("Recall");
        } else if (hp < 70) {
            System.out.println("Hati-hati");
        } else {
            System.out.println("Lanjut push");
        }
    }
}
```

</details>
