// server/database.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'coworking_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test koneksi saat server mulai
pool.getConnection()
    .then(connection => {
        console.log('✅ Database MySQL berhasil terhubung!');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Gagal terhubung ke Database:', err.message);
    });

export default pool;