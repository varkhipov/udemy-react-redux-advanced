const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  // 'sub' stands for a conventional JWT property 'subject'
  // 'iat' stands for a conventional JWT property 'issued at time'
  return jwt.encode({ sub: user.id, iat: new Date().getTime() }, config.secret);
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }

  // Check if user exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) return next(err);

    // If yes then return an error
    if (existingUser) return res.status(422).send({ error: 'Email is in use' });

    // If no then create and save new record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function (err) {
      if (err) return next(err);

      // Send response
      // res.json(newUser);
      res.send({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function (req, res, next) {
  // User already has credentials, we need to give him a token.
  // Our LocalStrategy returns 'user' instance.
  // Passport assigns that instance to the Request automatically.
  res.send({ token: tokenForUser(req.user) })
};
