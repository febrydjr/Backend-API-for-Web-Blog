const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const validateRegis = () => {
  return [
    body("username")
      .notEmpty()
      .custom(async (value) => {
        const user = await User.findOne({ where: { username: value } });
        if (user) {
          throw new Error("Username already exists");
        }
        return true;
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
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("Email already registered");
        }
        return true;
      }),
    body("phone")
      .isLength({ max: 12 })
      .withMessage("Phone number cannot exceed 12 characters")
      .notEmpty(),
  ];
};

const regis = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // ---------------------------------------------------------------------------
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
    });

    // ---------------------------------------------------------------------------
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ message: "User registration successful", token });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ message: "Database error" });
  }
};

module.exports = { regis, validateRegis };
