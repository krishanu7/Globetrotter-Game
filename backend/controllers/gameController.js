const {
  getRandomDestination,
  getDestinationByID,
  updateScore,
} = require("../models/queries");

const getClues = async (req, res, next) => {
  try {
    const destination = await getRandomDestination();
    if (!destination) {
      return res.status(404).json({ message: "No destination found" });
    }
    // Randomly select two clues
    const clues = destination.clues;
    console.log("[DEBUG] Clues fetched:", clues);
    const randomClues = clues.sort(() => 0.5 - Math.random()).slice(0, 2);
    res.json({
      cityId: destination.id,
      clues: randomClues,
    });
  } catch (error) {
    console.error("[ERROR] Error fetching clues:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const submitGuess = async (req, res) => {
  try {
    const { cityId, guess } = req.body;
    console.log("[DEBUG] Guess submitted:", req.body);
    if (!cityId || !guess) {
      return res
        .status(400)
        .json({ message: "City Id and guess are required" });
    }
    const destination = await getDestinationByID(cityId);
    console.log(`[DEBUG] corrent city : ${destination.city}`);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }
    const isCorrect = destination.city.toLowerCase() === guess.toLowerCase();
    await updateScore(req.user.id, isCorrect);
    const funFact = destination.fun_fact[ Math.floor(Math.random() * destination.fun_fact.length)];

    res.json({ correct: isCorrect, funFact});
  } catch (error) {
    console.error("[ERROR] Error submitting guess:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getClues,
  submitGuess,
};
