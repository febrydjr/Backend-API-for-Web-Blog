const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const nodemailer = require("nodemailer");

const courier = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.userHotmail,
    pass: process.env.passHotmail,
  },
});
//gmail
module.exports = courier;
