const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, {
    collection: 'deals'
  })

module.exports = mongoose.model('Deal', dealSchema)