const jwt = require("jsonwebtoken");
const User = require("../models/users");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET;

const verificationTokens = new Map();

const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    if (verificationTokens.has(token)) {
      const expirationTime = verificationTokens.get(token);
      if (expirationTime < Date.now()) {
        return res.status(401).json({
          message: "Token tidak valid atau telah expired.",
        });
      }
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;

    const [updatedCount] = await User.update(
      { isverified: true },
      {
        where: { username },
      }
    );

    if (updatedCount === 0) {
      return res.status(404).json({
        message: "User tidak ada, atau akun telah verified..",
      });
    }

    verificationTokens.set(token, decoded.exp * 10);
    console.log(verificationTokens);
    return res.status(200).json({ message: "Verifikasi email berhasil." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memproses verifikasi email.",
    });
  }
};

module.exports = verify;
