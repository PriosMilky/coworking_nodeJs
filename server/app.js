// Ganti require menjadi import
import express from 'express'; 

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Halo Pahrul! Server Node.js berhasil berjalan tanpa database.');
});

app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`Server Backend berjalan di http://localhost:${PORT}`);
    console.log(`=================================`);
});