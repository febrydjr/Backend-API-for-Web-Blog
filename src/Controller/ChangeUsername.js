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

const changeUsername = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentUsername, newUsername } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.user_id;
  } catch (err) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.username !== currentUsername) {
      return res
        .status(401)
        .json({ error: "Incorrect current username / Username not found" });
    }

    const existingUser = await User.findOne({
      where: { username: newUsername },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const updatedUser = await user.update({
      username: newUsername,
    });

    await sendChangeUsernameEmail(user.email);

    return res
      .status(200)
      .json({ message: "Username changed successfully", updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error updating username in the database" });
  }
};

module.exports = {
  changeUsername,
  validateChangeUsername,
};
