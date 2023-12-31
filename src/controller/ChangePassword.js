const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const validateChangePass = () => {
  return [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one symbol"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ];
};

const verifyTokenAndGetUsername = (token) => {
  let username;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    username = decoded.username;
  } catch (err) {
    throw new Error("token tidak valid");
  }
  return username;
};

const updateUserPassword = async (user, currentPassword, password) => {
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    throw new Error("current password salah");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await user.update({ password: hashedPassword });
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

const changePassword = async (req, res) => {
  const { currentPassword, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const username = getTokenAndVerifyUsername(req, res);
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await updateUserPassword(user, currentPassword, password);

    return res.status(200).json({ message: "Password berhasil diubah!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  changePassword,
  validateChangePass,
};
