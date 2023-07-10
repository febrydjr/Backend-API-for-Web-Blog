const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const validateRegis = () => {
  return [
    body("username")
      .notEmpty()
      .custom((value) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM users WHERE username = ?";
          db.query(query, [value], (err, results) => {
            if (err) {
              reject(new Error("Database error"));
            }
            if (results.length > 0) {
              reject(new Error("Username already exists"));
            }
            resolve(true);
          });
        });
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/
      )
      .withMessage(
        "Password must contain at least 1 symbol, 1 uppercase letter, and 1 number"
      )
      .notEmpty(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom((value) => {
        return new Promise((resolve, reject) => {
          const query = "SELECT * FROM users WHERE email = ?";
          db.query(query, [value], (err, results) => {
            if (err) {
              reject(new Error("Database error"));
            }
            if (results.length > 0) {
              reject(new Error("Email already registered"));
            }
            resolve(true);
          });
        });
      }),
    body("phone")
      .isLength({ max: 12 })
      .withMessage("Phone number cannot exceed 12 characters")
      .notEmpty(),
  ];
};

const regis = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, phone } = req.body;

  //const hashedPassword = bcrypt.hashSync(password, 10);

  const query =
    "INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)";
  db.query(query, [username, password, email, phone], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Database error" });
    }

    // buat jwt
    const userId = results.insertId;
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "User registration successful", token });
  });
};

module.exports = { regis, validateRegis };
