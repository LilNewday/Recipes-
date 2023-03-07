const bcrypt = require('bcrypt');

app.post('/signUp', function (request, response) {
  let username = request.body.username;
  let password = request.body.password;
  let email = request.body.email;

  if (username && password && email) {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        console.error(err);
        response.status(500).send('Error creating account');
        return;
      }

      db.query(
        `INSERT INTO \`accounts\` (username, password, email) VALUES ('2', '${username}', '${hash}', '${email}')`,
        function (err, result) {
          if (err) {
            console.error(err);
            response.status(500).send('Error creating account');
            return;
          }

          response.send('Welcome to the app');
        }
      );
    });
  } else {
    response.status(400).send('Please enter an email, username and password');
  }
});

