const {Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

//Meal Type
class MealType extends Model {}
MealType.init(
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
    recipe_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:"recipe", 
            key: "id",

        },
    },
},
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "mealType",
  }
);

module.exports = MealType;