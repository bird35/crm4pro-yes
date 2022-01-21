// eslint-disable-next-line no-unused-vars
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Task Model
let taskSchema = require('../models/task');

// CREATE Task
router.route('/create-task').post((req, res, next) => {
  taskSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Tasks
router.route('/').get((req, res, next) => {
    // eslint-disable-next-line array-callback-return
    taskSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Task
router.route('/edit-task/:_id').get((req, res, next) => {
    taskSchema.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Task
router.route('/update-task/:_id').put((req, res, next) => {
    taskSchema.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      // eslint-disable-next-line no-sequences
      return next(error),
      console.log(error)
    } else {
      res.json(data)
      console.log('Task updated successfully !')
    }
  })
})

// Delete Task
router.route('/delete-task/:_id').delete((req, res, next) => {
    taskSchema.findByIdAndRemove(req.params._id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;