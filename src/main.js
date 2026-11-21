// src/main.js
console.log("Frontend loaded!");

// Ambil daftar ruangan dari backend
export async function getRooms() {
    const res = await fetch('/api/rooms');
    const data = await res.json();
    return data.status === 'success' ? data.data : [];
}

// Submit booking ke backend
export async function submitBooking(formData) {
    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (result.status === 'success') {
            sessionStorage.setItem('booking_code', result.data.booking_code);
            sessionStorage.setItem('booking_id', result.data.id);
            return result.data;
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error("❌ Gagal booking:", error);
        alert("Gagal: " + error.message);
        return null;
    }
}

// Ambil detail booking via kode (untuk upload.html & cek-status.html)
export async function getBookingByCode(code) {
    const res = await fetch(`/api/bookings/${code}`);
    const result = await res.json();
    return result.status === 'success' ? result.data : null;
}

// Kirim konfirmasi pembayaran
export async function uploadPayment(bookingId) {
    try {
        const res = await fetch(`/api/bookings/${bookingId}/payment`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ proof: 'bukti_transfer.jpg' })
        });
        const result = await res.json();
        return result.status === 'success';
    } catch (error) {
        console.error("❌ Gagal upload:", error);
        return false;
    }
}