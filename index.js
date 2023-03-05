//THIS IS JUST WHAT WE WANT THE HOMEPAGE TO LOOK LIKE ONCE WORKING
//INSTRUCTIONS TO GET THIS TO RUN
//start from the index.js file open integrated terminal
   // npm init
   // npm install express --save
   // node index.js-->
//THIS IS LINKED TO HANDLEBARS JS- MAKING ALL THE PAGES SHOW UP IN LOCALHOST

const express = require("express");
const path = require("path");
//This initiates sequelize for the recipe routes.
const sequelize = require("./config/connection.js" );

const app = express();
//May have a heroku conflict and can alternate with "const PORT = process.env.PORT || 3000;"
const port = 3000;

//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');
const viewspath =path.join(__dirname, "../layouts");
//Sets handlebars configurations 
app.engine('hbs', handlebars.engine({
layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'))
app.get('/', (req, res) => { 
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
res.render('main', {layout : 'index'});
});


//login
app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    //new configuration parameter
    defaultLayout: 'login',
    }));
    app.get('/', (req, res) => {
   res.render('main', {layout: 'index'});
    //res.render('login');
    });
//Commented out since Recipe function will include this.
//app.listen(port, () => console.log(`App listening to port ${port}`));


//Create recipe perameters
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
  app.listen(port, () => console.log(`Now listening on Port ${port}`));
});


