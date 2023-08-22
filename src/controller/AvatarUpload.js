const multer = require("multer");
const db = require("../models");
const User = db.User;
const jwt = require("jsonwebtoken");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: (req, file, cb) => {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const uniq = today + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);

    const newFileName = `${username}-${uniq}${ext}`;
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const maxSize = 1 * 1024 * 1024;
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    cb(
      "hanya ekstensi JPG, JPEG, PNG, dan GIF file yang diperbolehkan!",
      false
    );
  } else if (file.size > maxSize) {
    cb("Maks ukuran 1MB!", false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const uploadAvatar = async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).json({ error: "belum pilih file" });

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "token tidak ada" });

    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    const relativePath = file.path.replace(/^.*uploads[\\\/]/, "");
    await User.update({ avatar: relativePath }, { where: { username } });

    return res.status(200).json({ message: "berhasil upload avatar" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "gagal upload avatar!", message: error });
  }
};

module.exports = {
  uploadAvatar,
  upload: upload.single("avatar"),
};
