const path = require("path");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
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

const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPassword, password } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  let username;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    username = decoded.username;
  } catch (err) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }

  try {
    // -----------------------------------------------------
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // cek password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    // hash pw baru
    const hashedPassword = await bcrypt.hash(password, 10);

    // update pw ke db
    await user.update({ password: hashedPassword });

    return res.status(200).json({ message: "Password change successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error updating password in the database" });
  }
};

module.exports = {
  changePassword,
  validateChangePass,
};