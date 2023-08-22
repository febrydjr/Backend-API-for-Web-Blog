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

    const userId = getUserIdFromToken(token);
    const user = await findUserById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const avatarPath = getUserAvatarPath(user.avatar);
    if (!avatarPath)
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

const getUserIdFromToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.user_id;
};

const findUserById = async (userId) => {
  try {
    return await User.findOne({ where: { user_id: userId } });
  } catch (error) {
    throw new Error("Error finding user by ID");
  }
};

const getUserAvatarPath = (avatar) => {
  const avatarPath = path.join(
    __dirname,
    "../uploads/avatars",
    path.basename(avatar)
  );
  return fs.existsSync(avatarPath) ? avatarPath : null;
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
