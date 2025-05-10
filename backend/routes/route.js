const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../config/db.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const seedSql = fs.readFileSync(path.join(__dirname, '../sql/seed.sql')).toString();
    console.log('Executing SQL:', seedSql);
    await pool.query(seedSql);
    res.status(200).send('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
    res.status(500).send('Error initializing database.');
  }
});

module.exports = router;
