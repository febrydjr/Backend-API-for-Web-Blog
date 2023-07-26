const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const nodemailer = require("nodemailer");

const courier = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.userHotmail,
    pass: process.env.passHotmail,
  },
});

module.exports = courier;