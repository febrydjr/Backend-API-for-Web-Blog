const verificationTokens = new Map();
const db = require("../config/config");
const jwt = require("jsonwebtoken");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const verify = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (verificationTokens.has(token) && verificationTokens.get(token).used) {
      console.log(verificationTokens);
      return res.status(401).json({
        message: "Token tidak valid atau telah expired.",
      });
    }

    verificationTokens.set(token, { used: true });

    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;
    console.log(username);

    // update ke db kalo udah verif
    const query = "UPDATE users SET isverified = 1 WHERE username = ?";
    db.query(query, [username], (err, result) => {
      if (err) {
        console.error("kesalahan penulisan query: ", err);
        return res.status(500).json({
          message: "Terjadi kesalahan saat memproses verifikasi email.",
        });
      }
      return res.status(200).json({ message: "Verifikasi email berhasil." });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memproses verifikasi email.",
    });
  }
};

module.exports = verify;
