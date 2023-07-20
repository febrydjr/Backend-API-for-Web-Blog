const { body, validationResult } = require("express-validator");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const nodemailer = require("nodemailer");
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");

// const fs = require("fs");
// const emailtemplate = fs.readFileSync("./index.html", "utf8");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.userHotmail,
    pass: process.env.passHotmail,
  },
});

const validateForgotPassword = () => {
  return [body("email").isEmail().withMessage("Email not Found")];
};

const sendResetPasswordEmail = async (email) => {
  const user = await User.findOne({
    where: { email: email },
  });
  const token = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const mailOptions = {
    from: process.env.userHotmail,
    to: email,
    subject: "Permintaan Reset Password",
    html: `<html>
    <body>
      <h1>Permintaan Reset Password!</h1>
      <p>Halo kak,</p>
      <p>kakak telah meminta link untuk reset password. Silahkan klik tombol di
      bawah ini untuk mengatur ulang password:</p>
      <a href="http://localhost:3000/verification/${token}"
            style="
              display: inline-block;
              text-decoration: solid;
              padding: 13px;
              background-color: #48ff00;
              border: #000000 solid 2px;
              color: #000000;
              font-size: 17px;
              border-radius: 4px;"
              >Reset Password</a>
      <p>jika kakak tidak merasa apa yang aku rasakan, tolong abaikan email
      ini. Tapi lain kali password kakak jangan dilupain yaa:)</p>
      <p>Best regards,</p>
      <p>Febry Dharmawan Junior</p>
    </body>
  </html>`,
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
