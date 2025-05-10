const { getScore } = require("../models/queries")

const getScoreController = async (req, res) => {
    const userId = req.user.id;
    try {
        const score = await getScore(userId);
        if(!score) {
            return res.status(404).json({message: "Score not found"});
        }
        res.status(200).json({ score });
    } catch (error) {
        console.error("[ERROR] Error fetching score:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getInviteeScoreController = async (req, res) => {
  const inviterId = req.params.id;
  try {
    const score = await getScore(inviterId);
    if (!score) {
      return res.status(404).json({ message: "Invitee's score not found" });
    }
    res.status(200).json({ score });
  } catch (error) {
    console.error("[ERROR] Error fetching invitee's score:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {getScoreController, getInviteeScoreController}