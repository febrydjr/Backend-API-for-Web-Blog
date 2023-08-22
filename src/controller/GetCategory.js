const db = require("../models");
const Category = db.Category;
const Country = db.Country;

const getCategory = async (req, res) => {
  try {
    const category = await Category.findAll({
      attributes: ["category_id", "category"],
    });
    return res.status(200).json({ category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "gagal fetch category" });
  }
};

const getCountry = async (req, res) => {
  try {
    const country = await Country.findAll({
      attributes: ["country_id", "country"],
    });
    return res.status(200).json({ country });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "gagal fetch country" });
  }
};

module.exports = { getCategory, getCountry };
