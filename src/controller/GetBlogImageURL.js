const path = require("path");
const db = require("../models");
const Blog = db.Blog;

const GetImageURL = async (req, res) => {
  try {
    const { blogs_id } = req.params;
    const blog = await Blog.findByPk(blogs_id);
    if (blog && blog.image_url) {
      const imagePath = path.join(__dirname, `../uploads/${blog.image_url}`);
      return res.sendFile(imagePath);
    }

    return res.status(404).json({ error: "tidak ada gambar di blog itu!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "gagal mengambil gambar" });
  }
};

module.exports = GetImageURL;
