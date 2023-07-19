const path = require("path");
const Blog = require("../models/blogs");

const GetImageURL = async (req, res) => {
  try {
    const { blogs_id } = req.params;
    const blog = await Blog.findByPk(blogs_id);
    if (blog && blog.image_url) {
      const imagePath = path.join(__dirname, `../uploads/${blog.image_url}`);
      return res.sendFile(imagePath);
    }

    return res.status(404).json({ error: "tidak ada gambar di blog tersebut" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "gagal mengambil gambar" });
  }
};

module.exports = GetImageURL;
