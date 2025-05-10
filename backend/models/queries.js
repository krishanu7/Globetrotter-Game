const db = require("../config/db");

const createUser = async (username, email, passwordHash) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)`;
  const values = [username, email, passwordHash];
  try {
    const res = await db.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error("[ERROR] Error creating user:", error);
    throw error;
  }
};

const getUserByUsername = async (username) => {
  const query = `
    SELECT * FROM users WHERE username = $1`;
  const values = [username];
  try {
    const res = await db.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error("[ERROR] Error fetching user by username:", error);
    throw error;
  }
};

// Score Queries
// createScoreEntry

const createScoreEntry = async (userId) => {
  const query = `
    INSERT INTO scores (user_id)
    VALUES ($1)`;
  const values = [userId];
  try {
    const res = await db.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error("[ERROR] Error creating score entry:", error);
    throw error;
  }
};

// updateScore
const updateScore = async (userId, isCorrect) => {
  console.log("[DEBUG] User having userId: ", userId, " guessed: ", isCorrect);
  try {
    await db.query(
      `INSERT INTO scores (user_id, total_score, correct_answers, incorrect_answers, total_attempts)
       VALUES ($1, 0, 0, 0, 0)
       ON CONFLICT (user_id) DO NOTHING`,
      [userId]
    );

    if (isCorrect) {
      await db.query(
        `UPDATE scores
         SET total_score = total_score + 1,
             correct_answers = correct_answers + 1,
             total_attempts = total_attempts + 1
         WHERE user_id = $1`,
        [userId]
      );
    } else {
      await db.query(
        `UPDATE scores
         SET incorrect_answers = incorrect_answers + 1,
             total_attempts = total_attempts + 1
         WHERE user_id = $1`,
        [userId]
      );
    }

    console.log("[DEBUG] Score updated successfully");
  } catch (error) {
    console.error("[ERROR] Error updating score:", error);
    throw error;
  }
};

// getScore
const getScore = async (userId) => {
  const query = `
    SELECT total_score, correct_answers, incorrect_answers, total_attempts
    FROM scores
    WHERE user_id = $1`;
  const values = [userId];
  try {
    const res = await db.query(query, values);
    if (res.rows.length === 0) {
      return null;
    }
    return res.rows[0];
  } catch (error) {
    console.error("[ERROR] Error fetching score:", error);
    throw error;
  }
};

const getRandomDestination = async () => {
  const query = `
    SELECT * FROM destinations
    ORDER BY RANDOM()
    LIMIT 1`;
  try {
    const res = await db.query(query);
    if (res.rows.length === 0) {
      return null;
    }
    return res.rows[0];
  } catch (error) {
    console.error("[ERROR] Error fetching random question:", error);
    throw error;
  }
};

const getDestinationByID = async (id) => {
  const query = `
    SELECT * FROM destinations WHERE id = $1`;
  const values = [id];
  try {
    const res = await db.query(query, values);
    if (res.rows.length === 0) {
      return null;
    }
    return res.rows[0];
  } catch (error) {
    console.error("[ERROR] Error fetching destination by ID:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  createScoreEntry,
  updateScore,
  getScore,
  getRandomDestination,
  getDestinationByID,
};
