const path = require("path");
const { body, validationResult } = require("express-validator");
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const handlebars = require("handlebars");
const fs = require("fs").promises;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const courier = require("../utils/courier");

const validateForgotPassword = () => [
  body("email").isEmail().withMessage("Email not Found"),
];

const generateResetToken = (user) => {
  return jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      isverified: user.isverified,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

const createResetEmail = async (email, resetLink) => {
  const templatePath = path.resolve(__dirname, "../email-html/resetpass.html");
  const templateContent = await fs.readFile(templatePath, "utf-8");
  const template = handlebars.compile(templateContent);
  const html = template({ resetLink });
  const mailOptions = {
    from: process.env.userHotmail,
    to: email,
    subject: "Permintaan Reset Password",
    html: html,
  };
  return mailOptions;
};

const sendResetPasswordEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email not found");

  const token = generateResetToken(user);
  const resetLink = `http://localhost:3000/verification/${token}`;
  const mailOptions = await createResetEmail(email, resetLink);

  await courier.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "Email tidak terdaftar" });

    await sendResetPasswordEmail(email);
    return res
      .status(200)
      .json({ message: "Link untuk reset password berhasil dikirim!" });
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    return res.status(500).json({ error: "Gagal mengirim email" });
  }
};

module.exports = { validateForgotPassword, forgotPassword };
