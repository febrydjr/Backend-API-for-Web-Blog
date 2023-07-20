const db = require("../models");
const Category = db.Category;

const getCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      attributes: ["category_id", "category"],
    });
    return res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving category" });
  }
};

module.exports = getCategory;
