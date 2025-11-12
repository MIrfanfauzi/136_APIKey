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
