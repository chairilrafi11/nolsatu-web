# Bab 10 — Class & Object (Puncak Materi!)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Memahami perbedaan **class** (cetakan) dan **object** (hasil cetakan)
- Membuat class sendiri dengan atribut & method
- Membuat banyak object dari satu class

## 🎮 Analogi Mobile Legends (yang paling penting!)

Pikirkan hero di Mobile Legends.

MOONTON tidak membuat Layla, Balmond, Gusion, Nana **satu per satu dari nol** setiap kali. Mereka punya **cetakan/blueprint** yang disebut "Hero".

**Cetakan "Hero"** mendefinisikan: setiap hero punya **nama**, **HP**, **damage**, dan bisa **menyerang**.

Dari **satu cetakan** itu, mereka membuat banyak hero yang berbeda:

| Cetakan | → | Object |
|---------|---|--------|
| Hero (blueprint) | → | Layla (HP 2600, damage 120) |
| Hero (blueprint) | → | Balmond (HP 3000, damage 200) |
| Hero (blueprint) | → | Gusion (HP 2400, damage 250) |

Dalam koding:

- **Class** = cetakan/blueprint (template)
- **Object** = hasil cetakan yang nyata, dengan nilai masing-masing

> Ini inti dari **OOP** (Object-Oriented Programming) — cara berpikir yang membuat Java (dan banyak bahasa lain) kuat.

## 📖 Materi

### 1. Membuat class `Hero`

```java
public class Hero {
    String nama;
    int hp;
    int damage;

    void serang() {
        System.out.println(nama + " menyerang dengan " + damage + " damage!");
    }
}
```

Bedah:
- `String nama;` → **atribut/field** (data yang dimiliki hero)
- `int hp;` → atribut
- `int damage;` → atribut
- `void serang() { ... }` → **method** (perilaku hero)

> Perhatikan: di dalam class, method **tidak** memakai kata `static`. Nanti dijelaskan kenapa — untuk sekarang, ingat: method di dalam class biasa tidak pakai `static`.

### 2. Membuat object dari class

Sekarang bikin object nyata dari cetakan itu:

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero();
        layla.nama = "Layla";
        layla.hp = 2600;
        layla.damage = 120;

        layla.serang();   // Layla menyerang dengan 120 damage!
    }
}
```

Kata kunci: **`new`** = "buat object baru dari cetakan ini".

```java
Hero layla = new Hero();
```

Dibaca: "buat object `layla` bertipe `Hero` (dari cetakan `Hero`)".

> Ingat `Scanner input = new Scanner(System.in);` dari Bab 4? Itu sama persis! `input` adalah object dari class `Scanner`. Sekarang kamu paham artinya.

### 3. Banyak object dari satu class

Kekuatan sebenarnya: satu class → banyak object.

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero();
        layla.nama = "Layla";
        layla.hp = 2600;
        layla.damage = 120;

        Hero balmond = new Hero();
        balmond.nama = "Balmond";
        balmond.hp = 3000;
        balmond.damage = 200;

        layla.serang();     // Layla menyerang dengan 120 damage!
        balmond.serang();   // Balmond menyerang dengan 200 damage!
    }
}
```

> `layla` dan `balmond` adalah dua object berbeda, masing-masing punya nilai `nama`, `hp`, `damage` sendiri.

### 4. Konstruktor — mengisi data saat object dibuat

Mengisi atribut satu per satu itu ribet. **Konstruktor** membantu: method khusus yang otomatis dipanggil saat `new`.

```java
public class Hero {
    String nama;
    int hp;
    int damage;

    Hero(String n, int h, int d) {   // konstruktor
        nama = n;
        hp = h;
        damage = d;
    }

    void serang() {
        System.out.println(nama + " menyerang dengan " + damage + " damage!");
    }
}
```

Konstruktor punya ciri: **nama-nya sama persis dengan nama class**, dan **tidak punya tipe return** (tidak ada `void`).

Sekarang membuat object jadi lebih rapi:

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero("Layla", 2600, 120);
        Hero balmond = new Hero("Balmond", 3000, 200);

        layla.serang();
        balmond.serang();
    }
}
```

Output:

```
Layla menyerang dengan 120 damage!
Balmond menyerang dengan 200 damage!
```

> `new Hero("Layla", 2600, 120)` → otomatis memanggil konstruktor dan mengisi `nama`, `hp`, `damage`.

### 5. Method yang mengubah atribut

Object bisa punya perilaku yang mengubah datanya sendiri:

```java
public class Hero {
    String nama;
    int hp;

    Hero(String n, int h) {
        nama = n;
        hp = h;
    }

    void kenaSerang(int damage) {
        hp = hp - damage;
        System.out.println(nama + " kena " + damage + " damage, sisa HP: " + hp);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero("Layla", 2600);

        layla.kenaSerang(500);   // Layla kena 500 damage, sisa HP: 2100
        layla.kenaSerang(300);   // Layla kena 300 damage, sisa HP: 1800
    }
}
```

### 6. Menaruh dua class di satu file vs terpisah

Untuk praktisnya, kamu bisa menaruh `Hero` dan `Main` di **satu file**:

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero("Layla", 2600, 120);
        layla.serang();
    }
}

class Hero {
    String nama;
    int hp;
    int damage;

    Hero(String n, int h, int d) {
        nama = n;
        hp = h;
        damage = d;
    }

    void serang() {
        System.out.println(nama + " menyerang dengan " + damage + " damage!");
    }
}
```

> Aturan: hanya **satu** class yang boleh pakai kata `public`, dan nama file harus sama dengan class `public` itu (di sini `Main.java`).

## 💪 Latihan

### Soal 1
Buat class `Hero` dengan atribut `nama` dan `hp`, lalu konstruktor. Buat 3 object hero berbeda, tampilkan nama & HP mereka.

### Soal 2
Tambah method `kenaSerang(int damage)` ke class `Hero` (seperti contoh di materi). Buat object `layla` (HP 2600), lalu panggil `kenaSerang(600)` dua kali. Tampilkan sisa HP-nya.

### Soal 3 (Tantangan)
Buat class `Hero` dengan atribut `nama` dan `level`, lalu method `naikLevel()` yang menambah `level` sebesar 1. Buat object, panggil `naikLevel()` 3 kali, tampilkan level akhirnya.

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero("Layla", 2600);
        Hero balmond = new Hero("Balmond", 3000);
        Hero gusion = new Hero("Gusion", 2400);

        System.out.println(layla.nama + " - HP: " + layla.hp);
        System.out.println(balmond.nama + " - HP: " + balmond.hp);
        System.out.println(gusion.nama + " - HP: " + gusion.hp);
    }
}

class Hero {
    String nama;
    int hp;

    Hero(String n, int h) {
        nama = n;
        hp = h;
    }
}
```

**Soal 2**

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero("Layla", 2600);

        layla.kenaSerang(600);
        layla.kenaSerang(600);
    }
}

class Hero {
    String nama;
    int hp;

    Hero(String n, int h) {
        nama = n;
        hp = h;
    }

    void kenaSerang(int damage) {
        hp = hp - damage;
        System.out.println(nama + " kena " + damage + " damage, sisa HP: " + hp);
    }
}
```

**Soal 3**

```java
public class Main {
    public static void main(String[] args) {
        Hero layla = new Hero("Layla");

        layla.naikLevel();
        layla.naikLevel();
        layla.naikLevel();

        System.out.println("Level " + layla.nama + ": " + layla.level);
    }
}

class Hero {
    String nama;
    int level;

    Hero(String n) {
        nama = n;
        level = 1;
    }

    void naikLevel() {
        level++;
    }
}
```

</details>

---

## 🏆 Selamat!

Kamu sudah menyelesaikan seluruh course! Dari nol sampai bisa bikin class & object sendiri.

Konsep yang sudah kamu kuasai:
- Variabel & tipe data
- Input & output
- Aritmatika
- Percabangan (`if/else`, `switch`)
- Perulangan (`for`, `while`)
- Array
- Method
- **Class & Object (OOP)**

Langkah selanjutnya yang disarankan (di luar course ini):
- Encapsulation (`private`, getter/setter)
- Inheritance (hero mewarisi dari class dasar)
- ArrayList (array yang bisa membesar)
- Latihan soal: buat program simulasi pertarungan 2 hero memakai class!

Semangat, kamu sudah "menang" di level pertama coding. 🎉
