const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth')
const gameRoutes = require('./routes/game.js');
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    console.log("[INFO] Health check endpoint hit");
    res.status(200).json({ message: "Perfect" });
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/game", gameRoutes)

app.use(errorHandler);

module.exports = app;
