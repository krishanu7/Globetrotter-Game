const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../routes/route'); 

const router = express.Router();

router.get('/init-db', async (req, res) => {
  try {
    const seedSql = fs.readFileSync(path.join(__dirname, '../sql/seed.sql')).toString();
    await pool.query(seedSql);
    res.status(200).send('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
    res.status(500).send('Error initializing database.');
  }
});

module.exports = router;
