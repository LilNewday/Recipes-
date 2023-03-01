const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;


app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


app.get('/recipes/new', async (req, res) => {
    const ingredients = await Ingredient.findAll();
    res.render('new_recipe', { ingredients });
  });
  
  app.post('/recipes', async (req, res) => {
    const { name, preparation, ingredients } = req.body;
    const recipe = await Recipe.create({ name, preparation });
    await recipe.addIngredients(ingredients);
    res.redirect('/recipes');
  });


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

