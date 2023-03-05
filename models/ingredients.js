const  {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection.js");

//Ingredients
class Ingredients extends Model {}
Ingredients.init(
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
    measure: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    amount: {
        type: Sequelize.INTEGER,
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
    modelName: "ingredient",
  }
);

module.exports = Ingredients;