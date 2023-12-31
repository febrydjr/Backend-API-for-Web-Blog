const path = require("path");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const validateResetPass = () => {
  return [
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

const getUsernameFromToken = (token) => {
  let username;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    username = decoded.username;
  } catch (err) {
    throw new Error("token tidak valid");
  }
  return username;
};

const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { password } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "token tidak ada" });
  }
  try {
    const username = getUsernameFromToken(token);
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });
    return res.status(200).json({ message: "Berhasil reset password!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Gagal reset password" });
  }
};

module.exports = {
  resetPassword,
  validateResetPass,
};
