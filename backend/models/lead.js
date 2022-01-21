const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

let leadSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  organization: {
    type: String,
    required: false
  },
  department: {
    type: String,
  
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  source: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  country: {
    type: String,
    
  }, 
}, {
    collection: 'leads'
  })
 
  // require plugins
  leadSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
  leadSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)
  
  //leadSchema.index({ name: 1, organization: 1, email: 1 }); // compound index on email + firstName + lastName

module.exports = mongoose.model('Lead', leadSchema)