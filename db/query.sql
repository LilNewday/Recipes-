DROP DATABASE IF EXISTS userinfo_db;

CREATE DATABASE userinfo_db;

USE userinfo_db;

CREATE TABLE loginInfo (
userName VARCHAR(30) NOT NULL,
password VARCHAR(200) NOT NULL
);

INSERT INTO loginInfo (userName, password)
  VALUES ('AndrewL', 'Abc123!!');



CREATE DATABASE dinner_db;

USE dinner_db;

CREATE TABLE recipe (
dish VARCHAR(30) NOT NULL,
how VARCHAR(500) NOT NULL
);

INSERT INTO recipe (dish, how) VALUES ('chicken', 'Ingredients:

2 chicken breasts
1 bunch of asparagus
2 tablespoons of olive oil
Salt and pepper, to taste
Instructions:

Preheat the oven to 400°F (200°C).
Place the chicken breasts and asparagus spears on a baking sheet.
Drizzle with 2 tablespoons of olive oil and sprinkle with salt and pepper.
Bake for 20-25 minutes, or until the chicken is cooked through and the asparagus is tender.
Serve and enjoy!');