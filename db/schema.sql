DROP DATABASE IF EXISTS recipe_db;

CREATE DATABASE recipe_db;

USE recipe_db;

CREATE TABLE recipe (
  recipe_id INT PRIMARY KEY,
  title VARCHAR(255),
  preparations TEXT,
  image_url VARCHAR(255)
);

CREATE TABLE ingredient (
  ingredient_id INT PRIMARY KEY,
  name VARCHAR(255),
  measure TEXT,
  amount INT,
);

CREATE TABLE recipe_ingredient (
  recipe_id INT,
  ingredient_id INT,
  measure TEXT
  amount INT,
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
);

CREATE TABLE MealType (
  MealType_id INT PRIMARY KEY,
  name VARCHAR(255),
);

CREATE TABLE recipe_MealType (
  recipe_id INT,
  MealType_id INT,
  PRIMARY KEY (recipe_id, MealType_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
  FOREIGN KEY (MealType_id) REFERENCES MealType(MealType_id)
);

