const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/users");
const { Op } = require("sequelize");

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

  try {
    // -------------------------------------------------------------------
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: identifier },
          { email: identifier },
          { phone: identifier },
        ],
      },
    });
    // -------------------------------------------------------------------

    if (!user) {
      return res
        .status(401)
        .json({ message: "401: username/email/phone atau password salah" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "401: username/email/phone atau password salah" });
    }

    const infosesi = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password,
    };

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ message: "login sukses.", token, infosesi });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "500: error" });
  }
};

module.exports = { validateLogin, login };
