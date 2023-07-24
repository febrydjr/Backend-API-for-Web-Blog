const path = require("path");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs").promises;
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.userHotmail,
    pass: process.env.passHotmail,
  },
});

const validateChangePhone = () => {
  return [
    body("currentPhone")
      .notEmpty()
      .withMessage("Current phone number is required"),
    body("newPhone").notEmpty().withMessage("New phone number is required"),
  ];
};

const sendChangePhoneEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.userHotmail,
        pass: process.env.passHotmail,
      },
    });

    const templatePath = path.resolve(
      __dirname,
      "../email-html/changephone.html"
    );
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const template = handlebars.compile(templateContent);

    const mailOptions = {
      from: process.env.userHotmail,
      to: email,
      subject: "Pemberitahuan Perubahan Nomor Telepon",
      html: template(),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending change phone number email:", error);
    throw error;
  }
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

    if (user.phone !== currentPhone) {
      return res.status(401).json({ error: "Incorrect current phone number" });
    }

    const updatedUser = await user.update({
      phone: newPhone,
    });

    await sendChangePhoneEmail(user.email);

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
