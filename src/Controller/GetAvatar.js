const jwt = require("jsonwebtoken");
const User = require("../models/users");
const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const getAvatar = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Missing authorization token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    const user = await User.findOne({ where: { user_id: user_id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const avatarFileName = path.basename(user.avatar);
    const avatarPath = path.join(
      __dirname,
      "../uploads/avatars",
      avatarFileName
    );

    if (!fs.existsSync(avatarPath)) {
      return res.status(404).json({ error: "Avatar file not found" });
    }

    const avatarData = fs.readFileSync(avatarPath);

    const fileExt = path.extname(avatarPath).toLowerCase();
    const contentType = getContentType(fileExt);
    res.setHeader("Content-Type", contentType);
    res.send(avatarData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving avatar" });
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
