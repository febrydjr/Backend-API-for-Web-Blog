const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const verificationTokens = new Map();

const isTokenValid = (token) => {
  if (verificationTokens.has(token)) {
    const expirationTime = verificationTokens.get(token);
    return expirationTime >= Date.now();
  }
  return true;
};

const verifyUpdate = async (token, username) => {
  const [updatedCount] = await User.update(
    { isverified: true },
    {
      where: { username },
    }
  );
  return updatedCount;
};

const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!isTokenValid(token)) {
      return res.status(401).json({
        message: "Token tidak valid / expired / anda telah terverifikasi.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    const updatedCount = await verifyUpdate(token, username);
    if (updatedCount === 0) {
      return res.status(404).json({
        message: "User tidak ada, atau akun telah verified",
      });
    }
    verificationTokens.set(token, decoded.exp * 10);
    return res.status(200).json({ message: "Verifikasi email berhasil." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan saat memproses verifikasi email.",
      token: error,
    });
  }
};

module.exports = verify;
