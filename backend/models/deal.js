const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');


let dealSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  noCall: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
}, {
    collection: 'deals'
  })

   // require plugins
   dealSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
   dealSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)
   
   //dealSchema.index({ name: 1, organization: 1, email: 1 }); // compound index on email + firstName + lastName

module.exports = mongoose.model('Deal', dealSchema)