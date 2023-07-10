const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const validateLogin = () => {
  return [
    body("identifier")
      .notEmpty()
      .withMessage("Username/Email/Phone harus diisi."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password harus memiliki setidaknya 8 karakter."),
  ];
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { identifier, password } = req.body;
  //---------------------------------------------------------

  const query = `SELECT * FROM users WHERE (username = ? OR email = ? OR phone = ?) AND password = ?`;

  //---------------------------------------------------------
  db.query(
    query,
    [identifier, identifier, identifier, password],
    (err, results) => {
      if (err) {
        console.log("kesalahan penulisan query");
        return res.status(500).json({ message: "500: error" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({ message: "401: username/email/phone atau password salah" });
      }

      const user = results[0];
      const hashedPassword = bcrypt.hashSync(password, 8);
      const infosesi = {
        userId: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        password: hashedPassword,
      };

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ message: "login sukses.", token, infosesi });
    }
  );
};

module.exports = { validateLogin, login };
