const passport = require('passport');
const jwtStrategy = require('./strategies/jwtStrategy');
const localStrategy = require('./strategies/localStrategy');


// Basically we may have 3 types of requests:
//
// 1. Sign Up Requests:
// - Get credentials
// - Check if this user does not exist
// - Generate token
//
// 2. Sign In Requests:
// - Get credentials
// - Verify credentials with existing ones
// - Generate token
//
// 3. Authenticated Requests:
// - Verify token
// - Give an access to requested resource

// Sign Up Requests doesn't require authentication check, so no need in any strategy.
//

// Sign In Requests require registration check and authentication check.
passport.use('local', localStrategy);

// Authenticated Requests require JWT token check.
// Since token is based on users ID then the strategy if decoding passed token, gets ID
// and checks if a user with this ID exists.
passport.use('jwt', jwtStrategy);
