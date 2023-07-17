const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Country = sequelize.define(
  "Country",
  {
    country_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "country",
    timestamps: true,
  }
);

module.exports = Country;
