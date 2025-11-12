const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// 1️⃣ Koneksi ke database MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',         // ubah jika user MySQL kamu berbeda
         // ubah jika port MySQL kamu berbeda
  password: 'irfanfauzi',         // isi jika ada password
  database: 'apikey_db', // sesuai yang kamu buat
  port: 3309 
});

db.connect(err => {
  if (err) {
    console.error('❌ Gagal konek ke database:', err);
  } else {
    console.log('✅ Terhubung ke MySQL');
  }
});
// 2️⃣ Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 3️⃣ Route utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 4️⃣ POST /create → generate key dan simpan ke database
app.post('/create', (req, res) => {
  try {
    // Generate random key
    const randomKey = crypto.randomBytes(32).toString('hex');
    const apiKey = `tiumy_${randomKey}`;
    const createdAt = new Date();

    // Simpan ke database
    const sql = 'INSERT INTO apikeys (key_value, created_at) VALUES (?, ?)';
    db.query(sql, [apiKey, createdAt], (err, result) => {
      if (err) {
        console.error('Error insert:', err);
        return res.status(500).json({
          success: false,
          message: 'Gagal menyimpan API Key ke database',
          error: err.message
        });
      }

      res.json({
        success: true,
        apiKey: apiKey,
        createdAt: createdAt,
        message: 'API Key berhasil dibuat dan disimpan ke database',
        insertId: result.insertId
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal membuat API Key',
      error: error.message
    });
  }
});
