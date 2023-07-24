const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const getAvatar = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Missing authorization token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id;
    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const avatarPath = path.join(
      __dirname,
      "../uploads/avatars",
      path.basename(user.avatar)
    );
    if (!fs.existsSync(avatarPath))
      return res.status(404).json({ error: "Avatar file not found" });

    const avatarData = fs.readFileSync(avatarPath);
    const contentType = getContentType(path.extname(avatarPath).toLowerCase());

    res.setHeader("Content-Type", contentType);
    res.send(avatarData);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error retrieving avatar", token: error });
  }
};

const getContentType = (fileExt) => {
  switch (fileExt) {
    case ".jpeg":
    case ".jpg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
};

module.exports = {
  getAvatar,
};
