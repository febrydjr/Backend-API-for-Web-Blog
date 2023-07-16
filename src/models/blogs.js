"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.Category, { foreignKey: "category_id" });
      Blog.belongsTo(models.Country, { foreignKey: "country_id" });
      Blog.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Blog.init(
    {
      blogs_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      keyword: {
        type: DataTypes.STRING,
      },
      country_id: {
        type: DataTypes.INTEGER,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      user_id: {
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
      sequelize,
      modelName: "Blog",
      tableName: "blogs",
    }
  );
  return Blog;
};
