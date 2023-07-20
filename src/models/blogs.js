const { DataTypes } = require("sequelize");
const categoryModel = require("./category");
const countryModel = require("./country");
const userModel = require("./users");

module.exports = (sequelize, Sequelize) => {
  const Category = categoryModel(sequelize, Sequelize);
  const Country = countryModel(sequelize, Sequelize);
  const User = userModel(sequelize, Sequelize);

  const Blog = sequelize.define(
    "Blog",
    {
      blogs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.TEXT,
        validate: {
          len: [0, 500],
        },
      },
      video_url: {
        type: DataTypes.STRING,
      },
      keyword: {
        type: DataTypes.STRING,
      },
      country_id: {
        type: DataTypes.INTEGER,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "blogs",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Associations
  Blog.belongsTo(Category, { foreignKey: "category_id" });
  Blog.belongsTo(Country, { foreignKey: "country_id" });
  Blog.belongsTo(User, { foreignKey: "user_id" });

  return Blog;
};
