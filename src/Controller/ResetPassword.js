const path = require("path");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

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

const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;

  // Verify authorization token and extract user ID
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
    // Find the user in the database
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password in the database
    await user.update({ password: hashedPassword });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error updating password in the database" });
  }
};

module.exports = {
  resetPassword,
  validateResetPass,
};
