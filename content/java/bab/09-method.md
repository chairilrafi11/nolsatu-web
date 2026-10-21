# Bab 9 — Method / Function (Kumpulan Perintah Bisa Dipanggil)

## 🎯 Target Belajar

Setelah bab ini kamu bisa:
- Membuat method sendiri
- Mengirim data ke method (parameter)
- Menerima hasil balik dari method (return)

## 🎮 Analogi Mobile Legends

Lihat skill hero di Mobile Legends. Skill punya **nama**, misal "Skill 1: Piercing Shot".

Saat kamu menekan tombol skill:

1. Game **menjalankan** serangkaian aksi (muncul efek, hitung damage, kurangi HP musuh)
2. Kamu **tidak perlu tahu detailnya** — kamu cukup panggil skill-nya

Di koding, hal itu namanya **method** (atau function): sekumpulan perintah yang **diberi nama**, dan bisa **dipanggil** kapan saja.

> Method = "skill" dalam program. Punya nama, bisa dipanggil berkali-kali, dan bisa menerima masukan (parameter) serta mengeluarkan hasil (return).

## 📖 Materi

### 1. Kenapa perlu method?

Tanpa method, kalau kamu mau mencetak garis pemisah 3 kali:

```java
System.out.println("==========");
System.out.println("==========");
System.out.println("==========");
```

Dengan method, tulis sekali, panggil berkali-kali:

```java
public class Main {
    public static void main(String[] args) {
        cetakGaris();
        System.out.println("Hello");
        cetakGaris();
    }

    public static void cetakGaris() {
        System.out.println("==========");
    }
}
```

Output:

```
==========
Hello
==========
```

Keuntungannya: kalau mau ubah bentuk garis, cukup ubah **satu tempat** (di method), bukan 3 tempat.

### 2. Anatomi method

```java
public static void cetakGaris() {
    System.out.println("==========");
}
```

| Bagian | Arti |
|--------|------|
| `public static` | Baku dulu, abaikan maknanya (dijelaskan di Bab 10) |
| `void` | Method ini **tidak mengembalikan** nilai |
| `cetakGaris` | Nama method (bebas, camelCase) |
| `( )` | Tempat parameter (masukan), kosong = tidak ada |
| `{ ... }` | Isi / perintah method |

### 3. Method dengan parameter

Parameter = **masukan** untuk method. Seperti skill yang bisa diatur kekuatannya.

```java
public class Main {
    public static void main(String[] args) {
        serang("Layla", 120);
        serang("Balmond", 200);
    }

    public static void serang(String namaHero, int damage) {
        System.out.println(namaHero + " menyerang dengan " + damage + " damage!");
    }
}
```

Output:

```
Layla menyerang dengan 120 damage!
Balmond menyerang dengan 200 damage!
```

Cara baca: method `serang` menerima dua masukan — `String namaHero` dan `int damage`. Saat dipanggil `serang("Layla", 120)`, nilai `"Layla"` masuk ke `namaHero`, dan `120` masuk ke `damage`.

> Urutan penting! `serang("Layla", 120)` → "Layla" ke parameter pertama, 120 ke parameter kedua.

### 4. Method dengan return

`return` = method **mengembalikan** hasil. Seperti skill yang menghasilkan damage, lalu hasilnya dipakai di tempat lain.

```java
public class Main {
    public static void main(String[] args) {
        int hasil = hitungDamage(120, 2);
        System.out.println("Total damage: " + hasil);
    }

    public static int hitungDamage(int damage, int jumlahHit) {
        int total = damage * jumlahHit;
        return total;
    }
}
```

Output: `Total damage: 240`

Perhatikan perbedaannya:
- Tipe di depan nama method (`int` pada `int hitungDamage(...)`) = **tipe nilai yang dikembalikan**
- `void` = tidak mengembalikan apa-apa
- `return total;` = kirim nilai `total` kembali ke pemanggil

> Ingat: **`return` = keluar dari method dan kirim nilai**. Setelah `return`, sisa perintah di method tidak dijalankan.

### 5. Beberapa method return umum

```java
public static boolean masihHidup(int hp) {
    return hp > 0;
}

public static int max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}
```

## 💪 Latihan

### Soal 1
Buat method `sapa(String nama)` yang menampilkan `Halo <nama>!`, lalu panggil 3 kali dengan nama berbeda.

### Soal 2
Buat method `luasPersegi(int sisi)` yang **mengembalikan** luas (sisi × sisi). Panggil dengan `sisi = 5`, tampilkan hasilnya.

### Soal 3
Buat method `ganjilGenap(int angka)` yang menampilkan `genap` atau `ganjil` (pakai `%` dari Bab 5). Panggil dengan `angka = 7` dan `angka = 10`.

<details>
<summary>🙈 Kunci Jawaban</summary>

**Soal 1**

```java
public class Main {
    public static void main(String[] args) {
        sapa("Budi");
        sapa("Layla");
        sapa("Tigreal");
    }

    public static void sapa(String nama) {
        System.out.println("Halo " + nama + "!");
    }
}
```

**Soal 2**

```java
public class Main {
    public static void main(String[] args) {
        int hasil = luasPersegi(5);
        System.out.println("Luas: " + hasil);
    }

    public static int luasPersegi(int sisi) {
        return sisi * sisi;
    }
}
```

**Soal 3**

```java
public class Main {
    public static void main(String[] args) {
        ganjilGenap(7);
        ganjilGenap(10);
    }

    public static void ganjilGenap(int angka) {
        if (angka % 2 == 0) {
            System.out.println(angka + " genap");
        } else {
            System.out.println(angka + " ganjil");
        }
    }
}
```

</details>
