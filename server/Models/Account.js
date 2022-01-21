const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accountSchema = new Schema({
  assignee: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
}, {
    collection: 'accounts'
  })

module.exports = mongoose.model('Account', accountSchema)