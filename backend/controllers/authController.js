// registerUser function
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser} = require("../models/queries");


const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("[INFO] Registering user:", username, email);
  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ message : "User already exists"});
    }
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("[INFO] Creating user");
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await createUser(username, email, hashedPassword);

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("[ERROR] Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log("[INFO] Logging in user:", username);
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("[ERROR] Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser
};