
// Search Code
// Find all Meal Types
MealType.findAll().then(mealTypes => {
  console.log(mealTypes);
});

// Find all Recipes with a given Meal Type
Recipe.findAll({
  include: [{
    model: MealType,
    where: { name: 'Breakfast' },
  }],
}).then(recipes => {
  console.log(recipes);
});

// Find all Recipes with a given Ingredient
Recipe.findAll({
  include: [{
    model: Ingredient,
    where: { name: 'Egg' },
  }],
}).then(recipes => {
  console.log(recipes);
});
