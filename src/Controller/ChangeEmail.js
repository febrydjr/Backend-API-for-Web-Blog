const path = require("path");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const nodemailer = require("nodemailer");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const validateChangeEmail = () => {
  return [
    body("currentEmail")
      .isEmail()
      .withMessage("Current email address is required"),
    body("newEmail").isEmail().withMessage("New email address is required"),
  ];
};

const changeEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { currentEmail, newEmail } = req.body;

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Missing authorizationn token" });
  }
  const sendEmailNotification = async (email) => {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.userHotmail,
        pass: process.env.passHotmail,
      },
    });

    const mailOptions = {
      from: process.env.userHotmail,
      to: newEmail,
      subject: "Pemberitahuan Perubahan Email",
      html: `
        <html>
          <body>
            <h1>Pemberitahuan Perubahan Email</h1>
            <p>Halo kak,</p>
            <p>Email kamu telah berhasil diubah.</p>
            <p>Jika tidak merasa melakukan perubahan, segera hubungi aku!.</p>
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
              >Verifikasi Email</a>
            <p>Best regards,</p>
            <p>Febry Dharmawan Junior</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
  };
  let username;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    username = decoded.username;
  } catch (err) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }

  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.email !== currentEmail) {
      return res.status(401).json({ error: "Incorrect current email address" });
    }

    const existingUser = await User.findOne({ where: { email: newEmail } });
    if (existingUser) {
      return res.status(400).json({ error: "Email address already exists" });
    }

    const updatedUser = await user.update({
      email: newEmail,
      isverified: false,
    });

    await sendEmailNotification(updatedUser.email);
    return res
      .status(200)
      .json({ message: "Email address change successful", updatedUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error updating email address in the database" });
  }
};

module.exports = {
  changeEmail,
  validateChangeEmail,
};
