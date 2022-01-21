// eslint-disable-next-line no-unused-vars
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// account Model
let accountSchema = require('../models/account');

// CREATE account
router.route('/create-account').post((req, res, next) => {
  accountSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ accounts
router.route('/').get((req, res, next) => {
    // eslint-disable-next-line array-callback-return
    accountSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single account
router.route('/edit-account/:_id').get((req, res, next) => {
    accountSchema.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update account
router.route('/update-account/:_id').put((req, res, next) => {
    accountSchema.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      // eslint-disable-next-line no-sequences
      return next(error),
      console.log(error)
    } else {
      res.json(data)
      console.log('account updated successfully !')
    }
  })
})

// Delete account
router.route('/delete-account/:_id').delete((req, res, next) => {
    accountSchema.findByIdAndRemove(req.params._id, (error, data) => {
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