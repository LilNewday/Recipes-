const Db = require('./config/connection');
const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

var passwordValidator = require('password-validator');
var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname)));
app.use(require('./controllers/recipe-routes'));

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Bootcampsql1!',
    database: 'nodelogin',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 10000, 
    queueLimit: 0,
    multipleStatements: true
  },
  console.log(`Connected to the nodelogin database.`)
);

// http://localhost:3001/
app.get('/', function(request, response) {
	// Render login template
	response.render('login');
});

// http://localhost:3001/auth
app.post('/auth', function(request, response) {

  console.log('u and p');
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	
	if (username && password) {
   
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			
			if (error) throw error;
	
			if (results.length > 0) {
		
				request.session.loggedin = true;
				request.session.username = username;

				response.render('homepage', {username: username})
		
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/newUser', function(request, response) {
	response.render('signup')
});

app.post('/newUserSignup', async(request, response) => {
	try{
	
	let username = request.body.username;
	let password = request.body.password;
	let email = request.body.email;
	console.log(schema.validate({password}))


	if (username && schema.validate.password == 'true' && email) {
   
		 db.query('INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(error, results, fields) {
			if (error) throw error;
			console.log('Account created successfully!');
		});

		response.render('homepage', {username: username})
	} else {console.log('false') 
	response.render('signupfailed', {username: username})
}
		
	} catch (error) {
    console.error(error);
}
});		

app.use((req, res) => {
  res.status(404).end();
});

Db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
