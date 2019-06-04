const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
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

  // generate salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // encrypt salted password
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        next(err);
      }

      // override plain text password with encrypted one
      user.password = hash;

      // finish hook execution, continue the normal cycle
      next();
    })
  })
});

// Create model class
const ModelClass = mongoose.model('user', userSchema);

// Export model
module.exports = ModelClass;
