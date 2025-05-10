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
  try {
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
  }
  catch (error) {
    console.error("[ERROR] Error fetching score:", error);
    throw error;
  }
};

// getRandomQuestion
const getRandomQuestion = async () => {
  const query = `
    SELECT * FROM questions
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

module.exports = {
  createUser,
  getUserByUsername,
  createScoreEntry,
  updateScore,
  getScore,
  getRandomQuestion
};
