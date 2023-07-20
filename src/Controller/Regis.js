const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const nodemailer = require("nodemailer");

const validateRegis = () => {
  return [
    body("username")
      .notEmpty()
      .custom(async (value) => {
        const user = await User.findOne({ where: { username: value } });
        if (user) {
          throw new Error("Username already exists");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/
      )
      .withMessage(
        "Password must contain at least 1 symbol, 1 uppercase letter, and 1 number"
      )
      .notEmpty(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          throw new Error("Email already registered");
        }
        return true;
      }),
    body("phone")
      .isLength({ max: 12 })
      .withMessage("Phone number cannot exceed 12 characters")
      .notEmpty(),
  ];
};

const regis = async (req, res) => {
  const token = jwt.sign(
    {
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      isverified: false,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  const sendLinkVerif = async () => {
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.userHotmail,
        pass: process.env.passHotmail,
      },
    });

    const mailOptions = {
      from: process.env.userHotmail,
      to: req.body.email,
      subject: "Pendaftaran Akun Baru",
      html: `
        <html>
          <body>
            <h1>Pendaftaran Akun Baru</h1>
            <p>Halo kak,</p>
            <p>Kakak telah berhasil melakukan registrasi, langkah selanjutnya adalah melakukan verifikasi dengan klik tombol di bawah:</p>
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
              >Verifikasi</a>
            <p>Terima kasih, Selamat datang di Crea-te!.</p>
            <p>Best regards,</p>
            <p>Febry Dharmawan Junior</p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // ---------------------------------------------------------------------------
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
    });

    // ---------------------------------------------------------------------------
    await sendLinkVerif(req.body.email);
    return res.json({
      message: "registrasi sukses, silahkan cek email untuk verifikasi!",
      token,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    return res.status(500).json({ message: "Database error" });
  }
};

module.exports = { regis, validateRegis };
