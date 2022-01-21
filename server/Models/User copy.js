const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

let userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  recoveryCode: {
    type: String,
    trim: true,
    default: '',
  },
  active: {
      type: Boolean,
      default: true,
  },
  admin: {
      type: Boolean,
      default: false,
  },
}, {
    collection: 'users'
  });
 
  // require plugins
  userSchema.plugin(bcrypt); // automatically bcrypts passwords
  userSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
  userSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)
  
  userSchema.index({ email: 1, username: 1 }); // compound index on email + username

module.exports = mongoose.model('User', userSchema)