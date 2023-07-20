const { Sequelize, Op } = require("sequelize");
const db = require("../models");
const Blog = db.Blog;
const User = db.User;
const Category = db.Category;
const Country = db.Country;

const GetAllBlog = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const cat_id = req.query.cat_id || null;
    const title = req.query.title || null;
    const sort = req.query.sort || "desc";
    const username = req.query.username || null;

    const whereClause = {};
    if (cat_id) {
      whereClause.category_id = cat_id;
    }
    if (title) {
      whereClause.title = { [Op.like]: `%${title}%` };
    }
    if (username) {
      whereClause["$User.username$"] = username;
    }

    const sortOrder = sort === "asc" ? "ASC" : "DESC";

    const { count: totalBlogs, rows: blogs } = await Blog.findAndCountAll({
      order: [["created_at", sortOrder]],
      include: [
        {
          model: User,
          attributes: [],
          as: "User",
        },
        {
          model: Category,
          attributes: [],
        },
        {
          model: Country,
          attributes: [],
        },
      ],
      where: whereClause,
      attributes: [
        "blogs_id",
        "title",
        [Sequelize.literal("`User`.`username`"), "author"],
        "created_at",
        "image_url",
        "content",
        "video_url",
        "keyword",
        [Sequelize.literal("`Category`.`category`"), "category"],
        [Sequelize.literal("`Country`.`country`"), "country"],
      ],
      limit,
      offset,
    });

    const totalPages = Math.ceil(totalBlogs / limit);

    return res.status(200).json({
      pages: page,
      totalPages,
      totalBlogsInPage: blogs.length,
      totalBlogs,
      blogsResult: blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve blogs" });
  }
};

module.exports = GetAllBlog;
