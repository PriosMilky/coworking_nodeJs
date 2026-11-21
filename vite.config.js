// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Konfigurasi Multi-Page App (MPA)
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'src/admin.html'),
        booking: resolve(__dirname, 'src/booking.html'),
        upload: resolve(__dirname, 'src/upload.html'),
        cekStatus: resolve(__dirname, 'src/cek-status.html'),
      },
    },
  },
  // Konfigurasi Proxy agar Frontend bisa akses Backend tanpa CORS
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});