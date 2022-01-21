const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('mongoose-bcrypt');
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

let userSchema = new Schema({
  firstName: {
    type: String,
    index: true,
    required: true
  },
  lastName: {
    type: String,
    index: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  recoveryCode: {
    type: String,
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
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
}, {
    collection: 'users'
  });
 
  // require plugins
  userSchema.plugin(bcrypt); // automatically bcrypts passwords
  userSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
  userSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)
  
  userSchema.index({ email: 1, username: 1 }); // compound index on email + username

  userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };

module.exports = mongoose.model('User', userSchema)