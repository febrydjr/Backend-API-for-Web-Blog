const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET;

const keepLogin = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;
    const user_id = decoded.userId;
    const userData = {
      user_id: user_id,
      username: username,
    };

    res.json(userData);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = keepLogin;
