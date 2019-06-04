const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');


// Setup options for Local Strategy
const localOptions = {
  usernameField: 'email'
};

// about exports and module.exports: https://stackoverflow.com/a/12907839
module.exports = exports = new LocalStrategy(localOptions, function (email, password, done) {
  // Verify username and password
  // call 'done' with the user if they're correct
  // otherwise, call 'done' with false
  User.findOne({ email: email }, function (err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);

    // compare passwords - is 'password' equal to 'user.password'?
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    })
  })
});
