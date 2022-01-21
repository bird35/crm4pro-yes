const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongooseStringQuery = require('mongoose-string-query');

let taskSchema = new Schema({
  subject: {
    type: String,
    index: true,
    required: true
  },
  description: {
    type: String, 
    required: false
  },
  createdBy: {
    type: String,
    index: true,
    required: true
  },
  assignedTo: {
    type: String,
    required: true
  },
  isCompleted: {
    type: String,
    required: false
  },
  dueDate: {
    type: Date,
    required: true
  },
  completedAt: {
    type: Date,
    required: false
  },
}, {
    collection: 'tasks'
  })

  // require plugins
  taskSchema.plugin(timestamps); // automatically adds createdAt and updatedAt timestamps
  taskSchema.plugin(mongooseStringQuery); // enables query capabilities (e.g. ?foo=bar)

  taskSchema.index({ subject: 1, description: 1 }); // compound index on subject + description

module.exports = mongoose.model('Task', taskSchema)