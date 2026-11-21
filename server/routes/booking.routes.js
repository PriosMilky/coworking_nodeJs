// server/routes/booking.routes.js
import express from 'express';
import pool from '../database.js';

const router = express.Router();

// 1. POST: Simpan Booking Baru
router.post('/', async (req, res) => {
    try {
        const { customer_name, customer_phone, room_id, booking_date, start_time, end_time, total_price } = req.body;

        // Validasi input dasar
        if (!customer_name || !customer_phone || !room_id || !booking_date || !start_time || !end_time) {
            return res.status(400).json({ status: 'error', message: 'Semua field wajib diisi!' });
        }

        // Generate Kode Booking Unik (COCO-XXXX)
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const booking_code = `COCO-${randomNum}`;

        // Simpan ke Database
        const [result] = await pool.query(
            `INSERT INTO bookings (booking_code, customer_name, customer_phone, room_id, booking_date, start_time, end_time, total_price, status) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'MENUNGGU_VERIFIKASI')`,
            [booking_code, customer_name, customer_phone, room_id, booking_date, start_time, end_time, total_price]
        );

        res.status(201).json({
            status: 'success',
            message: 'Booking berhasil dibuat!',
            data: {
                booking_code: booking_code,
                id: result.insertId
            }
        });

    } catch (error) {
        console.error('Error saat membuat booking:', error);
        res.status(500).json({ status: 'error', message: 'Gagal memproses booking', error: error.message });
    }
});

// 2. GET: Cek Status Booking berdasarkan Kode
router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params;

        const [rows] = await pool.query(
            `SELECT b.booking_code, b.customer_name, b.booking_date, b.start_time, b.end_time, b.status, b.total_price, r.name as room_name 
             FROM bookings b 
             JOIN rooms r ON b.room_id = r.id 
             WHERE b.booking_code = ?`,
            [code]
        );

        if (rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Kode booking tidak ditemukan.' });
        }

        res.json({ status: 'success', data: rows[0] });

    } catch (error) {
        console.error('Error saat cek status:', error);
        res.status(500).json({ status: 'error', message: 'Gagal mengambil data booking' });
    }
});

// ... (kode POST dan GET yang sudah ada) ...

// 3. PUT: Update Bukti Pembayaran (Simulasi)
router.put('/:id/payment', async (req, res) => {
    try {
        const { id } = req.params;
        // Di sini nanti kita akan simpan file asli, untuk sekarang kita update status saja
        // atau tambahkan kolom payment_proof_path jika sudah ada di tabel
        
        await pool.query(
            `UPDATE bookings SET payment_proof_path = 'dummy_proof.jpg', status = 'MENUNGGU_VERIFIKASI' WHERE id = ?`,
            [id]
        );

        res.json({ status: 'success', message: 'Bukti pembayaran diterima.' });
    } catch (error) {
        console.error('Error upload payment:', error);
        res.status(500).json({ status: 'error', message: 'Gagal upload bukti' });
    }
});

export default router;