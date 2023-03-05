const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");

//Recipe
class Recipe extends Model {}
Recipe.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preparations: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;