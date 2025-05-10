const express = require("express");
const router = express.Router();
const { getScoreController } = require("../controllers/scoreController");
const authMiddleware = require("../middleware/auth")

router.get("/", authMiddleware, getScoreController);

module.exports = router;