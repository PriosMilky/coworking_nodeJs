// server/app.js
import express from 'express';
import dotenv from 'dotenv';
import pool from './database.js';
import bookingRoutes from './routes/booking.routes.js';
import mikrotikRoutes from './routes/mikrotik.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/mikrotik', mikrotikRoutes);

// Health Check
// Endpoint daftar ruangan (untuk dropdown booking.html)
app.get('/api/rooms', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM rooms WHERE is_active = 1');
        res.json({ status: 'success', data: rows });
    } catch (error) {
        console.error('❌ Error /api/rooms:', error.message);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Daftarkan Route Booking (Akses via /api/bookings)
app.use('/api/bookings', bookingRoutes); // <-- TAMBAHKAN INI

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 Server Backend berjalan di http://localhost:${PORT}`);
    console.log(`=================================`);
});