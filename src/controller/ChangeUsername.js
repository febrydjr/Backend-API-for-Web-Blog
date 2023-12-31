const path = require("path");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const handlebars = require("handlebars");
const courier = require("../utils/courier");
const fs = require("fs").promises;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const validateChangeUsername = () => {
  return [
    body("currentUsername")
      .notEmpty()
      .withMessage("Current username is required"),
    body("newUsername").notEmpty().withMessage("New username is required"),
  ];
};

const sendChangeUsernameEmail = async (email) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      "../email-html/changeusername.html"
    );
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateContent);
    const mailOptions = {
      from: process.env.userHotmail,
      to: email,
      subject: "Pemberitahuan Perubahan Username",
      html: template(),
    };
    await courier.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending change username email:", error);
    throw error;
  }
};

const verifyTokenAndGetUserId = (token) => {
  let userId;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.user_id;
  } catch (err) {
    throw new Error("token tidak valid");
  }
  return userId;
};

const updateUserAndSendEmail = async (user, currentUsername, newUsername) => {
  if (user.username !== currentUsername) {
    throw new Error("Username tidak terdaftar");
  }
  const existingUser = await User.findOne({
    where: { username: newUsername },
  });
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const updatedUser = await user.update({
    username: newUsername,
  });
  await sendChangeUsernameEmail(user.email);
  return updatedUser;
};

const getTokenAndVerify = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "token tidak ada" });
  }
  let userId;
  try {
    userId = verifyTokenAndGetUserId(token);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
  return userId;
};

const changeUsername = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { currentUsername, newUsername } = req.body;
  try {
    const user_id = getTokenAndVerify(req, res);
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await updateUserAndSendEmail(
      user,
      currentUsername,
      newUsername
    );
    return res
      .status(200)
      .json({ message: "berhasil mengubah username", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  changeUsername,
  validateChangeUsername,
};
