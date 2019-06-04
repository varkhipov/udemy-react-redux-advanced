const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define model
const userSchema = new Schema({
  email: { type: String, lowercase: true, unique: true },
  password: String
});

// On save hook, encrypt password
// Runs before saving a model
userSchema.pre('save', function (next) {
  // 'this' is an instance of a User model
  const user = this;

  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);

    // override plain text password with encrypted one
    user.password = hash;

    // finish hook execution, continue the normal cycle
    next();
  });
});

// Give User object additional methods. 'comparePassword' in this case. Could have any name.
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  })
};

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
