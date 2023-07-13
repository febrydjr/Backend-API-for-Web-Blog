const path = require("path");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const validateChangeUsername = () => {
  return [
    body("currentUsername")
      .notEmpty()
      .withMessage("Current username is required"),
    body("newUsername").notEmpty().withMessage("New username is required"),
  ];
};

const sendResetPasswordEmail = async (email) => {
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
    subject: "Pemberitahuan Perubahan Username",
    html: `
      <html>
        <body>
          <h1>Pemberitahuan Perubahan Username</h1>
          <p>Halo kak,</p>
          <p>Username kamu telah berhasil diubah.</p>
          <p>Jika tidak merasa melakukan perubahan, segera hubungi aku!.</p>
          <p>Best regards,</p>
          <p>Febry Dharmawan Junior</p>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const changeUsername = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentUsername, newUsername } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  let userId;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.user_id;
  } catch (err) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.username !== currentUsername) {
      return res
        .status(401)
        .json({ error: "Incorrect current username / Username not found" });
    }

    const existingUser = await User.findOne({
      where: { username: newUsername },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const updatedUser = await user.update({
      username: newUsername,
    });

    await sendResetPasswordEmail(user.email);

    return res
      .status(200)
      .json({ message: "Username changed successfully", updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error updating username in the database" });
  }
};

module.exports = {
  changeUsername,
  validateChangeUsername,
};