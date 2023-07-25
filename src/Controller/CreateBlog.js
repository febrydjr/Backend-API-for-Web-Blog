const multer = require("multer");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });
const db = require("../models");
const Blog = db.Blog;
const User = db.User;
const Category = db.Category;
const Country = db.Country;
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/image_url"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    cb(new Error("Only JPG, JPEG, PNG, and GIF files are allowed"));
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("image");

const createBlog = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { title, content, category_id, keyword, country_id, video_url } =
        req.body;

      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "token tidak ada" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user_id = decoded.user_id;

      const isVerified = await User.findOne({
        where: { user_id, isverified: true },
      });
      if (!isVerified) {
        return res
          .status(401)
          .json({ error: "silahkan verifikasi akun terlebih dahulu" });
      }

      const category = await Category.findOne({ where: { category_id } });
      if (!category) {
        return res.status(404).json({ error: "kategori tidak ada" });
      }

      const country = await Country.findOne({ where: { country_id } });
      if (!country) {
        return res.status(404).json({ error: "country tidak ada" });
      }

      const imageUrl = req.file ? req.file.path : "";
      const relativePath = imageUrl.replace(/^.*uploads[\\\/]/, "");

      const blog = await Blog.create({
        title,
        content,
        user_id: user_id,
        created_at: new Date(),
        image_url: relativePath,
        category_id,
        keyword,
        country_id,
        video_url,
      });

      return res.status(200).json({ message: "Berhasil membuat blog!", blog });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error buat blog", msg: error });
  }
};

module.exports = { createBlog };
