// server/routes/mikrotik.routes.js
import express from 'express';
import { mikrotikService } from '../services/mikrotik.service.js';

const router = express.Router();

// 1. GET: Tes koneksi & ambil profile
router.get('/profiles', async (req, res) => {
    try {
        const profiles = await mikrotikService.getHotspotProfiles();
        res.json({ status: 'success', data: profiles });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 2. POST: Buat Voucher (Endpoint ini nanti akan dipanggil saat Admin klik "Verifikasi")
router.post('/create-voucher', async (req, res) => {
    try {
        const { username, password, profile, limit_uptime } = req.body;

        if (!username || !password || !profile) {
            return res.status(400).json({ status: 'error', message: 'Username, password, dan profile wajib diisi' });
        }

        const result = await mikrotikService.createVoucherUser(username, password, profile, limit_uptime || '10h');

        if (result.success) {
            res.json({ status: 'success', message: 'Voucher berhasil dibuat di MikroTik', data: result.data });
        } else {
            res.status(500).json({ status: 'error', message: result.error });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Terjadi kesalahan server', error: error.message });
    }
});

export default router;