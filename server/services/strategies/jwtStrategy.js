const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../../config');
const User = require('../../models/user');

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT Strategy
// new JwtStrategy(options, verify)
// verify::'payload' - is a JWT automatically decoded payload
// verify::'done' - a callback for proceeding passport authentication
module.exports = exports = new JwtStrategy(jwtOptions, function (payload, done) {
  // Check if the user ID in the payload exists in our database
  // If it does (is authenticated), call 'done' with that other
  // otherwise (is not authenticated), call 'done' without a user object
  User.findById(payload.sub, function (err, user) {
    if (err) {
      // 'err' - error
      // 'false' - user is not authenticated
      return done(err, false);
    }

    if (user) {
      // If no errors and user is found:
      // 'null' - no errors,
      // 'user' - user which is authenticated
      done(null, user);
    } else {
      // If no errors and user is not found:
      // 'null' - no errors,
      // 'user' - user is not authenticated
      done(null, false);
    }
  })
});
