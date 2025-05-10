const express = require("express");
const router = express.Router();
const { getScoreController, getInviteeScoreController } = require("../controllers/scoreController");
const authMiddleware = require("../middleware/auth")

router.get("/", authMiddleware, getScoreController);
router.get("/invitee/:id", getInviteeScoreController);


module.exports = router;