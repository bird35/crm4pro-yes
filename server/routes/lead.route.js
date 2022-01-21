// eslint-disable-next-line no-unused-vars
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Lead Model
let leadSchema = require('../Models/Lead');

// CREATE Lead
router.route('/create-lead').post((req, res, next) => {
  leadSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Leads
router.route('/').get((req, res, next) => {
    // eslint-disable-next-line array-callback-return
    leadSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Lead
router.route('/edit-lead/:_id').get((req, res, next) => {
    leadSchema.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Lead
router.route('/update-lead/:_id').put((req, res, next) => {
    leadSchema.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      // eslint-disable-next-line no-sequences
      return next(error),
      console.log(error)
    } else {
      res.json(data)
      console.log('Lead updated successfully !')
    }
  })
})

// Delete Lead
router.route('/delete-lead/:_id').delete((req, res, next) => {
    leadSchema.findByIdAndRemove(req.params._id, (error, data) => {
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