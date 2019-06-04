const passport = require('passport');
const Authentication = require('./controllers/authentication');

// This kind of imports are not used directly, but still are executed.
// Otherwise, 'Unknown authentication strategy' exception will be thrown
// because passportService provides creation and usage of additional strategies
const passportService = require('./services/passport');

// 'jwt' | 'local' - strategy types
// 'session: false' - by default Passport creates cookie-based session for user, prevent this
const requireAuth = passport.authenticate('jwt', { session: false });
const requireRegistration = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireRegistration, Authentication.signin);

  app.get('/', requireAuth, function (req, res) {
    res.send({ hi: 'there' });
  });
};
