const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth')
const gameRoutes = require('./routes/game.js');
const scoreRoutes = require("./routes/score.js")
const initDbRoute = require("./routes/route.js");
const errorHandler = require("./middleware/errorHandler");

require('dotenv').config();

const allowedOrigins = [
  'http://localhost:5173',
  'https://globetrotter-game-pi.vercel.app',
  'https://globetrotter-game-krishanu7s-projects.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
    console.log("[INFO] Health check endpoint hit");
    res.status(200).json({ message: "Perfect" });
});

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/game", gameRoutes)
app.use("/api/v1/score", scoreRoutes)
app.use('/api/v1/init-db', initDbRoute);


app.use(errorHandler);

module.exports = app;
