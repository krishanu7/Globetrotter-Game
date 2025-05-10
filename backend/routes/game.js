const express = require('express');
const {getClues, submitGuess} = require('../controllers/gameController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/clues', authMiddleware, getClues);
router.post('/guess', authMiddleware, submitGuess);

module.exports = router;
