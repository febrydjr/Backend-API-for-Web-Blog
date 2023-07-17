const multer = require("multer");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const path = require("path");

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// multer filter ekstensi dan ukuran
const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];
  const maxSize = 1 * 1024 * 1024; // 1MB

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

// multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Missing authorization token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;

    const filePath = req.file.path;
    const relativePath = filePath.replace(/^.*uploads[\\\/]/, "");

    await User.update(
      { avatar: relativePath },
      { where: { username: username } }
    );

    return res.status(200).json({ message: "Upload avatar successful!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error uploading avatar" });
  }
};

module.exports = {
  uploadAvatar,
  upload: upload.single("avatar"),
};
