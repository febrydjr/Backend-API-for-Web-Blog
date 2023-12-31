const path = require("path");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const courier = require("../utils/courier");
const handlebars = require("handlebars");
const fs = require("fs").promises;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const validateChangePhone = () => {
  return [
    body("currentPhone")
      .notEmpty()
      .withMessage("Current phone number is required"),
    body("newPhone").notEmpty().withMessage("New phone number is required"),
  ];
};

const sendChangePhoneEmail = async (email) => {
  try {
    const templatePath = path.resolve(
      __dirname,
      "../email-html/changephone.html"
    );
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateContent);

    const mailOptions = {
      from: process.env.userHotmail,
      to: email,
      subject: "Pemberitahuan Perubahan Nomor Telepon",
      html: template(),
    };
    await courier.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending change phone number email:", error);
    throw error;
  }
};

const verifyTokenAndGetUsername = (token) => {
  let username;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    username = decoded.username;
  } catch (err) {
    throw new Error("token tidak valid");
  }
  return username;
};

const updateUserAndSendEmail = async (user, currentPhone, newPhone) => {
  if (user.phone !== currentPhone) {
    throw new Error("Phone number tidak terdaftar");
  }
  const updatedUser = await user.update({
    phone: newPhone,
  });
  await sendChangePhoneEmail(user.email);
  return updatedUser;
};

const getTokenAndVerifyUsername = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "token tidak ada" });
  }
  let username;
  try {
    username = verifyTokenAndGetUsername(token);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
  return username;
};

const changePhone = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { currentPhone, newPhone } = req.body;
  try {
    const username = getTokenAndVerifyUsername(req, res);
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updatedUser = await updateUserAndSendEmail(
      user,
      currentPhone,
      newPhone
    );
    return res
      .status(200)
      .json({ message: "berhasil update phone number", updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  changePhone,
  validateChangePhone,
};
