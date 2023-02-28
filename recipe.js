const Sequelize = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql",
});

const MealType = sequelize.define("meal_type", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Recipe = sequelize.define("recipe", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  preparation: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

const Ingredient = sequelize.define("ingredient", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  measure: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Allergen = sequelize.define("allergen", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Define associations between models
Recipe.belongsToMany(MealType, { through: "recipe_meal_type" });
MealType.belongsToMany(Recipe, { through: "recipe_meal_type" });

Recipe.belongsToMany(Ingredient, { through: "recipe_ingredient" });
Ingredient.belongsToMany(Recipe, { through: "recipe_ingredient" });

Recipe.belongsToMany(Allergen, { through: "recipe_allergen" });
Allergen.belongsToMany(Recipe, { through: "recipe_allergen" });


await Recipe.sync();
await Ingredient.sync();
await Allergen.sync();
await MealType.sync();

