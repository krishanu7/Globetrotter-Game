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
  }
  catch (error) {
    console.error("[ERROR] Error fetching user by username:", error);
    throw error;
  }
}


module.exports = {
  createUser,
  getUserByUsername
}