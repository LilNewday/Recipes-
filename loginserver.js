
module.exports = function(pw, rules) {
  var issues = [];
  rules = rules || {};
  def(rules, 'minimumLength', 8);
  def(rules, 'maximumLength', 256);
  def(rules, 'requireCapital', true);
  def(rules, 'requireLower', true);
  def(rules, 'requireNumber', true);
  def(rules, 'requireSpecial', true);

  if (pw.length < rules.minimumLength) {
      issues.push({
          reason: 'minimumLength',
          message: 'Password must be between more than 8 characters and include a lower case letter, upper case letter, and a number',
          part: 'be at least ' + rules.minimumLength + ' letters long'
      });
  }
  if (pw.length > rules.maximumLength) {
      issues.push({
          reason: 'maximumLength',
          message: 'Password must be between more than 8 characters and include a lower case letter, upper case letter, and a number',
          part: 'be less than ' + rules.maximumLength + ' letters long'
      });
  }
  if (rules.requireCapital && !pw.match(/[A-Z]/g)) {
      issues.push({
          reason: 'requireCapital',
          message: 'Password must be between more than 8 characters and include a lower case letter, upper case letter, and a number',
          part: 'contain a capital letter'
      });
  }
  if (rules.requireLower && !pw.match(/[a-z]/g)) {
      issues.push({
          reason: 'requireLower',
          message: 'Password must be between more than 8 characters and include a lower case letter, upper case letter, and a number',
          part: 'contain a lowercase letter'
      });
  }
  if (rules.requireNumber && !pw.match(/\d/g)) {
      issues.push({
          reason: 'requireNumber',
          message: 'Password must be between more than 8 characters and include a lower case letter, upper case letter, and a number',
          part: 'contain a number'
      });
  }
  if (rules.requireSpecial && !pw.match(/\W+/g)) {
      issues.push({
          reason: 'requireSpecial',
          message: 'Password must be between more than 8 characters and include a lower case letter, upper case letter, and a number',
          part: 'contain a special character'
      });
  }

  return issues.length ? {
      sentence: sentence(issues),
      issues: issues
  }: false;


  // I don't think we will need this function
  function sentence(reasons) {
      var start = 'Password must ';
      if (reasons.length === 1) {
          return start + reasons[0].part + '.';
      }
      if (reasons.length === 2) {
          return start + reasons[0].part + ' and ' + reasons[1].part + '.';
      }
      if (reasons.length > 2) {
          var last = reasons[reasons.length - 1].part;
          return start + reasons.slice(0, -1).map(function(r) {
              return r.part;
          }).join(', ') + ', and ' + last + '.';
      }
  }
};

function def(o, option, val) {
  if (o[option] === undefined) o[option] = val;
}

const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

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

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3001/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/index.html'));
});

// http://localhost:3001/auth
app.post('/auth', function(request, response) {

  console.log('u and p');
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
   	// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3001/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
