const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const { Op } = require("sequelize");
const db = require("../models");
const User = db.User;

const validateLogin = () => [
  body("identifier")
    .notEmpty()
    .withMessage("Username/Email/Phone harus diisi."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password harus memiliki setidaknya 8 karakter."),
];

const findUser = async (identifier, password) => {
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: identifier },
          { email: identifier },
          { phone: identifier },
        ],
      },
    });

    if (!user) throw new Error("username/email/phone atau password salah");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new Error("username/email/phone atau password salah");

    return user;
  } catch (error) {
    throw error;
  }
};

const generateToken = (info_sesi) => {
  try {
    return jwt.sign(info_sesi, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

const infosesi = (user) => {
  return {
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    password: user.password,
    isverified: user.isverified,
  };
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { identifier, password } = req.body;
    const user = await findUser(identifier, password);
    if (user.isverified !== true)
      return res
        .status(401)
        .json({ message: "lakukan verifikasi akun anda terlebih dahulu" });
    const info_sesi = infosesi(user);
    const token = generateToken(infosesi(user));
    return res.status(200).json({ message: "login sukses.", token, info_sesi });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { validateLogin, login };
