const { body, validationResult } = require("express-validator");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const nodemailer = require("nodemailer");

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
    from: "angsabelanda1@hotmail.com",
    to: email,
    subject: "Permintaan Reset Password",
    html: `<h1>Halo kak😘,</h1>
      <p>kakak telah meminta link untuk reset password. Silakan klik tombol di bawah ini untuk mengatur ulang kata sandi:</p>
      <p><a href="http://localhost:3000/resetPassword" style="background-color: #4CAF50; border: none; color: white; padding: 10px 24px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Reset Password</a></p>
      <p>jika kakak tidak merasa apa yang aku rasakan, mohon abaikan email ini.</p>
      <p>lain kali password kakak jangan dilupain yaa:)</p>
      <p>dari si Pemuda Islami,</p>
      <h4>Febry Dharmawan Junior</h4>`,
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
