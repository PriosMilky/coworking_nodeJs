# CO&CO HUB - Sistem Informasi Penyewaan Co-Working Space (v1.0 MVP)

Repositori ini berisi *source code* untuk aplikasi web penyewaan Co-Working Space (Studi Kasus: PT Global Sinergi Kreasindo). 
Saat ini, proyek berada pada tahap **v1.0 (Minimum Viable Product / MVP) Frontend**, di mana alur pemesanan pelanggan disimulasikan menggunakan `localStorage` sebelum diintegrasikan dengan *Backend* (Node.js) dan *Database*.

## 🚀 Teknologi yang Digunakan
*   **Frontend:** HTML5, CSS3, Bootstrap 5, Vanilla JavaScript.
*   **Build Tool:** Vite
*   **Backend (Rencana):** Node.js & Express
*   **Database (Rencana):** MySQL / PostgreSQL

---

## 🔄 Alur Sistem (Flow) - Versi Pelanggan
1.  **Katalog Ruangan (`index.html`)**: Pelanggan melihat daftar ruangan, fasilitas, dan harga.
2.  **Form Pemesanan (`booking.html`)**: Pelanggan memilih ruangan, mengisi data diri, tanggal, dan jam. Sistem akan men-*generate* **Kode Booking** (Contoh: `COCO-1234`).
3.  **Upload Pembayaran (`upload.html`)**: Pelanggan mentransfer uang sesuai instruksi, lalu mengunggah foto bukti transfer.
4.  **Cek Status (`cek-status.html`)**: Pelanggan memasukkan Kode Booking untuk melihat status (Menunggu Verifikasi / Disetujui).

*(Catatan: Alur Admin/Dashboard belum diimplementasikan pada versi MVP Frontend ini).*

---

## 🛠️ Cara Install (Local Development)

Pastikan komputer/HP kamu sudah terinstall **Node.js** dan **npm**.

1. Buka terminal (atau Termux / Code Server).
2. Clone repositori ini atau buka folder proyek:
   ```bash
   cd coworking_nodeJs

Install semua dependensi yang dibutuhkan:
bash

npm install

Jalankan server development Vite:
bash

npm run dev

Buka tautan yang muncul di terminal (biasanya http://localhost:5173) di browser.

Cara Penggunaan (Simulasi Pelanggan)

    Buka halaman utama (Katalog).

    Klik tombol Pesan Sekarang pada salah satu ruangan (misal: Meeting Room Small).

    Isi form (Nama, No WA, Tanggal, Jam), lalu klik Lanjut ke Pembayaran.

    Catat Kode Booking yang muncul di halaman upload (misal: COCO-4821).

    Pilih gambar sembarang sebagai bukti transfer, lalu klik Kirim Konfirmasi.

    Di halaman Cek Status, ketikkan Kode Booking yang tadi kamu catat.

    Sistem akan menampilkan detail pesanan beserta status "Menunggu Verifikasi".

📌 Roadmap Pengembangan (v2.0)

    □

    Pembuatan REST API dengan Node.js (Express).
    □

    Integrasi Database (MySQL/PostgreSQL) untuk menyimpan data secara permanen.
    □

    Pembuatan Dashboard Admin (Verifikasi Pembayaran & CRUD Ruangan).
    □

    Pembuatan halaman khusus Staf Operasional (Jadwal Harian).
    □

    Integrasi WhatsApp Bot (Notifikasi & Cek Status).
    □

    Integrasi MikroTik API (Otomatisasi Voucher WiFi).

