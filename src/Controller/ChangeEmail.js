const path = require("path");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const courier = require("../utils/courier");
const handlebars = require("handlebars");
const fs = require("fs").promises;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const validateChangeEmail = () => {
  return [
    body("currentEmail")
      .isEmail()
      .withMessage("Current email address is required"),
    body("newEmail").isEmail().withMessage("New email address is required"),
  ];
};

const changeEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentEmail, newEmail } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "token tidak ada" });
  }

  let username;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    username = decoded.username;
  } catch (err) {
    return res.status(401).json({ error: "token tidak valid" });
  }

  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email !== currentEmail) {
      return res.status(401).json({ error: "Email tidak terdaftar" });
    }

    const existingUser = await User.findOne({ where: { email: newEmail } });
    if (existingUser) {
      return res.status(400).json({ error: "Email sudah digunakan" });
    }

    const updatedUser = await user.update({
      email: newEmail,
      isverified: false,
    });

    const verificationLink = `http://localhost:3000/verification/${token}`;
    const templatePath = path.resolve(
      __dirname,
      "../email-html/changeemail.html"
    );
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateContent);
    const html = template({ verificationLink });

    const mailOptions = {
      from: process.env.userHotmail,
      to: newEmail,
      subject: "Pemberitahuan Perubahan Email",
      html: html,
    };

    await courier.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "berhasil mengubah email!", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "error saat mengubah email" });
  }
};

module.exports = {
  changeEmail,
  validateChangeEmail,
};
