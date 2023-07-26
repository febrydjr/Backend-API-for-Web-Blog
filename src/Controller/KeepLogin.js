const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const keepLogin = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    const user_id = decoded.user_id;
    const userData = await User.findOne({
      where: {
        user_id: user_id,
        username: username,
      },
      attributes: ["user_id", "username"],
    });
    if (!userData) {
      return res.status(404).json({ error: "User gaada" });
    }
    res.json({ userData, pesan: "ini adalah API keep Login" });
  } catch (error) {
    res.status(401).json({ error: "token salah!", pesan: error });
  }
};

module.exports = keepLogin;
