-- database/schema.sql
CREATE DATABASE IF NOT EXISTS coworking_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE coworking_db;

-- 1. Katalog Ruangan
CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_per_hour DECIMAL(10,2) NOT NULL,
  capacity INT NOT NULL,
  facilities JSON,
  image_url VARCHAR(255),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Booking Pelanggan (pengganti localStorage)
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(20) NOT NULL UNIQUE,          -- format COCO-XXXX
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  room_id INT NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  payment_proof_path VARCHAR(255),
  status ENUM('MENUNGGU_VERIFIKASI','DISSETUJUI','DITOLAK')
         DEFAULT 'MENUNGGU_VERIFIKASI',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id)
) ENGINE=InnoDB;

-- 3. Voucher MikroTik (terikat ke booking yang DISETUJUI)
CREATE TABLE IF NOT EXISTS vouchers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_number VARCHAR(20) NOT NULL UNIQUE,         -- format CC-YYMMDD-001
  hotspot_username VARCHAR(50) NOT NULL UNIQUE,
  hotspot_password VARCHAR(255) NOT NULL,            -- simpan terenkripsi (AES-256-GCM)
  hotspot_profile VARCHAR(50) NOT NULL,
  limit_uptime VARCHAR(20) DEFAULT '10h',
  booking_id INT,
  is_sent TINYINT(1) DEFAULT 0,                      -- operator tandai sudah kirim WA
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id)
) ENGINE=InnoDB;

-- 4. Admin / Staf (login dashboard)
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','staf') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed data ruangan (contoh katalog)
INSERT INTO rooms (name, description, price_per_hour, capacity, facilities) VALUES
('Meeting Room Small', 'Ruang rapat kecil 4-6 orang', 50000, 6, '["WiFi","TV","Whiteboard"]'),
('Meeting Room Large', 'Ruang rapat besar 10-15 orang', 100000, 15, '["WiFi","Projector","Sound System"]'),
('Private Office', 'Ruang kerja privat', 75000, 4, '["WiFi","Meja Kerja","AC"]'),
('Coworking Seat', 'Kursi bersama area terbuka', 25000, 1, '["WiFi","Power Outlet"]');