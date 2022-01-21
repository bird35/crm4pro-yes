const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');


let accountSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  accountPerson: {
    type: String,
    required: false
  },
  industry: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
}, {
    collection: 'accounts'
  })

  // require plugins
  accountSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
  accountSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)
  
  //accountSchema.index({ name: 1, organization: 1, email: 1 }); // compound index on email + firstName + lastName

module.exports = mongoose.model('Account', accountSchema)