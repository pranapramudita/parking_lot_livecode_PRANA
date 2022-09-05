# Live Code - Typescript

## Ketentuan

1. Kerjakan sendiri, dengan usaha sendiri, tanpa bantuan teman, kerabat, maupun orangtua sendiri.
2. 15 menit pertama adalah sesi tanya jawab jika ada pertanyaan mengenai soal live code ini, pastikan kalian sudah benar-benar memahami soalnya sebelum memulai pengerjaan.
3. Tenang dan fokus, kerjakan apa yang menjadi kebutuhan (requirement) soalnya.
4. Makan, ke toilet, dan berdoalah sebelum mulai mengerjakan soal.
5. Commit yang jelas sesuai dengan apa yang kalian kerjakan, push pada GIT enigmacamp dengan nama repo Livecode-2 didalam sub-group typescript. 
6. Semoga sukses!

---

## Requirement

Enigmapark merupakan sebuah tempat parkir yang berada di kota jakarta dimana
banyak pelanggan yang menitipkan kendaraannya di enigmapark.

Karena pelanggan terlalu ramai, maka enigmapark membutuhkan sebuah aplikasi parkir yang dapat:

### Fungsi `parkingLot`

Fungsi ini berguna untuk membangun tempat parkir pertama kali, dengan rincian sebagai berikut:

- Menentukan kapasitas tempat parkir sesuai dengan parameternya.
- Pembuatan tempat parkir ini memerlukan waktu sebanyak 5000ms.
- Mengembalikan 3 actions yaitu, `park`, `leave`, dan `check`.

### Fungsi `park`

Fungsi ini berguna untuk mendaftarkan kendaraan yang akan parkir di enigmapark, dengan rincian sebagai berikut:

- Mendaftarkan kendaraan yang akan parkir, berupa object `Car`, dengan property `nopol` (Nomor Polisi) dan `pemilik`.
- Terdapat validasi jika mobil dengan nopol tertentu sudah terparkir, maka mobil tersebut tidak dapat diparkir.
- Terdapat validasi jika kapasitas tempat parkir penuh maka kendaraan tidak dapat masuk untuk diparkirkan.
- proses parkir ini memerlukan waktu 3000ms.

### Fungsi `leave`

Fungsi ini berguna untuk mengeluarkan kendaraan dari parking lot enigmapark, dengan rincian sebagai berikut:

- Melakukan checkout (leave) kendaraan berdasarkan `nopol` kendaraan.
- Terdapat validasi `nopol` kendaraan, yang bisa keluar hanya kendaran yang `nopol`-nya sudah terdaftar masuk ke tempat parkir.
- proses checkout kendaraan memerlukan waktu 1500ms

### Fungsi `check`

Fungsi ini akan menampilkan informasi kapasitas parkir, sisa slot parkir yang kosong, dan kendaraan yang sedang parkir.

- Proses check ini memerlukan waktu 500ms.
- Proses check akan mengembalikan object `ParkingLot`.

## Objects

### Car

```Javascript
class Car {
  nopol;    // Nomor Polisi
  pemilik;  // Nama Pemilik
}
```

### ParkingLot

```Javascript
class ParkingLot {
  capacity;   // Kapasitas tempat parkir
  remaining;  // Sisa tempat parkir yang masih kosong
  cars;       // Array dari object Car.
}
```

### Command Output Sample

#### Command
<!-- contoh jika urutan skenario yang diinginkan: -->

```Javascript
createPark -> 3 
park -> mobil1 
check
park -> mobil2 
leave -> B2021
park -> mobil3
park -> mobil4
leave -> B2019
park -> mobil5
park -> mobil1
leave -> B2021
check
leave -> BE001
check
```
    
#### Output
<!-- contoh output dari skenario diatas -->

```Javascript
Tempat parkir berhasil dibuat dengan kapasitas 3 kendaraan
Mobil Alex dengan Nopol BE001 berhasil parkir.
{ capacity: 3, remaining: 2, parkedCars: [mobil1] }
Mobil Blex dengan Nopol B2021 berhasil parkir.
Mobil Blex dengan Nopol B2021 sudah keluar.
Mobil Clex dengan Nopol C012 berhasil parkir.
Mobil Dlex dengan Nopol D0101 berhasil parkir.
Mobil dengan nopol B2019 tidak ada.
Mohoh maaf parkir sudah penuh.
Mobil Alex dengan Nopol BE001 sudah parkir sebelumnya.
Mobil dengan nopol B2021 tidak ada.
{ capacity: 3, remaining: 0, parkedCars: [mobil1, mobil3, mobil4] }
Mobil Blex dengan nopol BE001 sudah keluar.
{ capacity: 3, remaining: 1, parkedCars: [mobil3, mobil4] }
```