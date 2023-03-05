const Sequelize = require("sequelize");
const Ingredients = require("./ingredients");
const MealType = require("./mealtype");
const Recipe = require("./recipe");
const User = require("./User");


// Define associations between models
// Recipe.belongsToMany(MealType, { through: "recipe_meal_type" });
// MealType.belongsToMany(Recipe, { through: "recipe_meal_type" });

// Recipe.belongsToMany(Ingredients, { through: "recipe_ingredient" });
// Ingredients.belongsToMany(Recipe, { through: "recipe_ingredient" });

Recipe.hasMany(Ingredients, {
    foreignKey: "recipe_id",
    onDelete: "CASCADE"
});
Recipe.hasMany(MealType, {
    foreignKey: "recipe_id",
    onDelete: "CASCADE"
});


module.exports = {
    Ingredients,
    MealType,
    Recipe,
    User
}