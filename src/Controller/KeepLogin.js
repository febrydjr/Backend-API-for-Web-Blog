const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET;

const keepLogin = (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;
    const userData = {
      id: userId,
      username: "iniuser",
      email: "contohgan@cth.com",
      phone: "1234567890",
    };

    res.json(userData);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = keepLogin;
