const { body, validationResult } = require("express-validator");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const nodemailer = require("nodemailer");
const fs = require("fs");
const User = require("../models/users");

const emailtemplate = fs.readFileSync("./index.html", "utf8");

const user = process.env.userHotmail;
const pass = process.env.passHotmail;

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: user,
    pass: pass,
  },
});

const validateForgotPassword = () => {
  return [body("email").isEmail().withMessage("Email not Found")];
};

const sendResetPasswordEmail = async (email) => {
  const mailOptions = {
    from: user,
    to: email,
    subject: "Permintaan Reset Password",
    html: emailtemplate,
  };
  await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // ---------------------------------------------------
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ error: "Email tidak terdaftar" });
    }

    await sendResetPasswordEmail(email);
    res
      .status(200)
      .json({ message: "Link untuk reset password berhasil dikirim!" });
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    res.status(500).json({ error: "Gagal mengirim email" });
  }
};

module.exports = { validateForgotPassword, forgotPassword };
