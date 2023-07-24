const db = require("../models");
const Blog = db.Blog;
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const DeleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "Missing authorization token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    const blog = await Blog.findOne({ where: { blogs_id: blogId } });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    if (blog.user_id !== user_id)
      return res
        .status(401)
        .json({ error: "Unauthorized: You are not the author of this blog" });

    await Blog.destroy({ where: { blogs_id: blogId } });

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error deleting blog" });
  }
};

module.exports = DeleteBlog;
