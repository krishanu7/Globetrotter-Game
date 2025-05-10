const {
  getRandomDestination,
  getDestinationByID,
  getMultipleRandomCityOptionsExcluding,
  updateScore,
} = require("../models/queries");

const getClues = async (req, res) => {
  try {
    const destination = await getRandomDestination();
    if (!destination) {
      return res.status(404).json({ message: 'No destination found' });
    }

    const clues = destination.clues.sort(() => 0.5 - Math.random()).slice(0, 2);

    const incorrectOptions = await getMultipleRandomCityOptionsExcluding(destination.city, 3);

    const allOptions = [
      ...incorrectOptions.map((city) => ({ name: city.name })),
      { name: destination.city },
    ];

    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);

    const optionsWithIds = shuffledOptions.map((option, index) => ({
      id: index + 1,
      name: option.name,
    }));

    res.json({
      destinationId: destination.id,
      clues,
      options: optionsWithIds,
    });
  } catch (err) {
    console.error('[ERROR] Failed to fetch clues:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const submitGuess = async (req, res) => {
  try {
    const { destinationId, selectedId } = req.body;

    console.log("[DEBUG] Guess submitted:", req.body);

    if (!destinationId || selectedId === undefined) {
      return res.status(400).json({ message: "Destination ID and selected ID are required" });
    }

    const destination = await getDestinationByID(destinationId);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    const isCorrect = destination.id === selectedId;

    await updateScore(req.user.id, isCorrect);

    const funFact =
      destination.fun_fact[Math.floor(Math.random() * destination.fun_fact.length)];

    res.json({ isCorrect, funFact });

  } catch (error) {
    console.error("[ERROR] Error submitting guess:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getClues,
  submitGuess,
};
