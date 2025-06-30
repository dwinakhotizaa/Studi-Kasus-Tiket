# tiket-app 🎫  
Aplikasi Tiket Bantuan - Studi Kasus PKL Test Starcore 2025

## Deskripsi Proyek  
Aplikasi ini memungkinkan pengguna untuk mengirim tiket bantuan terkait proyek tertentu. Tiket berisi informasi seperti nama pengirim, email, jenis tiket, dan status penanganan. Aplikasi ini dibangun menggunakan **Vue 3 + Vite** di sisi frontend, dan backend menggunakan (Laravel / Express / sesuai yang digunakan, bisa disesuaikan sendiri).

---

## Fitur Utama

✅ Mengirim tiket bantuan melalui form  
✅ Menampilkan daftar tiket yang dapat dicari berdasarkan judul/nama  
✅ Mengedit tiket yang sudah dibuat  
✅ Menghapus tiket dengan status `cancel`  
✅ Relasi antar tabel: tiket ↔ jenis tiket ↔ proyek

---

## Struktur Halaman

- **Landing Page**: Halaman awal aplikasi
- **Form Tiket**: Input tiket bantuan (Nama, Email, Judul, Deskripsi, dsb.)
- **Daftar Tiket**: Tabel daftar semua tiket
- **Edit Tiket**: Ubah email, deskripsi, jenis tiket, status
- **Hapus Tiket**: Hanya tiket dengan status `cancel` yang dapat dihapus

---

## Screenshot Aplikasi 🖼️

### 🔹 Landing Page
![Landing Page](./screenshot/landing%20page.png)

### 🔹 Daftar Tiket
![Daftar Tiket](./screenshot/daftar%20tiket.png)

### 🔹 Tambah Tiket
![Tambah Tiket](./screenshot/tambah%20tiket.png)

### 🔹 Edit Tiket
![Edit Tiket](./screenshot/edit%20tiket.png)

### 🔹 Daftar Cari
![Daftar Cari](./screenshot/daftar%20cari.png)

> Pastikan folder `screenshot` berada sejajar dengan file `README.md`.

---

## Teknologi yang Digunakan

### 🔧 Frontend
- Vue 3
- Vite
- TailwindCSS (jika digunakan)

### ⚙️ Backend
- Express.js / Laravel / (pilih sesuai yang kamu pakai)
- MySQL / PostgreSQL

### 📦 Tools Tambahan
- GitHub
- Postman (untuk testing API)

---

## Cara Menjalankan Project

### 1. Install Dependensi

```sh
npm install
