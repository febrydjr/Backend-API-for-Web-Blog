const path = require("path");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const validateChangePhone = () => {
  return [
    body("currentPhone")
      .notEmpty()
      .withMessage("Current phone number is required"),
    body("newPhone").notEmpty().withMessage("New phone number is required"),
  ];
};

const sendPhoneChangeEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.userHotmail,
      pass: process.env.passHotmail,
    },
  });

  const mailOptions = {
    from: process.env.userHotmail,
    to: email,
    subject: "Pemberitahuan Perubahan Nomor Telepon",
    html: `
      <html>
          <body>
            <h1>Pemberitahuan Perubahan Nomor Telepon</h1>
            <p>Halo kak,</p>
            <p>No telepon kamu telah berhasil diubah.</p>
            <p>Jika tidak merasa melakukan perubahan, segera hubungi aku!.</p>
            <p>Best regards,</p>
            <p>Febry Dharmawan Junior</p>
          </body>
        </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const changePhone = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentPhone, newPhone } = req.body;

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
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.phone !== currentPhone) {
      return res.status(401).json({ error: "Incorrect current phone number" });
    }

    const updatedUser = await user.update({
      phone: newPhone,
    });

    await sendPhoneChangeEmail(user.email);

    return res
      .status(200)
      .json({ message: "Phone number change successful", updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error updating phone number in the database" });
  }
};

module.exports = {
  changePhone,
  validateChangePhone,
};
