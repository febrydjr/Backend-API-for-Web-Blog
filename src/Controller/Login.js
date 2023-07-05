const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    username: "andre",
    email: "contohgan@cth.com",
    phone: "1234567890",
    password: "Admin12@",
  },
];

const JWT_SECRET = "your-secret-key";
const validateLogin = () => {
  return [
    body("identifier")
      .notEmpty()
      .withMessage("Username/Email/Phone harus diisi."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password harus memiliki setidaknya 8 karakter."),
  ];
};
const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { identifier, password } = req.body;

  const user = users.find(
    (user) =>
      (user.username === identifier ||
        user.email === identifier ||
        user.phone === identifier) &&
      user.password === password
  );

  if (!user) {
    return res
      .status(401)
      .json({ message: "Username/Email/Phone atau password salah." });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  const infosesi = {
    userId: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    password: hashedPassword,
  };

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({ message: "Login berhasil.", token, infosesi });
};

module.exports = { validateLogin, login };
