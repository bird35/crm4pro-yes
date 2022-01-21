// eslint-disable-next-line no-unused-vars
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Deal Model
let dealSchema = require('../Models/Deal');

// CREATE Deal
router.route('/create-deal').post((req, res, next) => {
  dealSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Deals
router.route('/').get((req, res, next) => {
    // eslint-disable-next-line array-callback-return
    dealSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Deal
router.route('/edit-deal/:_id').get((req, res, next) => {
    dealSchema.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Deal
router.route('/update-deal/:_id').put((req, res, next) => {
    dealSchema.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      // eslint-disable-next-line no-sequences
      return next(error),
      console.log(error)
    } else {
      res.json(data)
      console.log('Deal updated successfully !')
    }
  })
})

// Delete Deal
router.route('/delete-deal/:_id').delete((req, res, next) => {
    dealSchema.findByIdAndRemove(req.params._id, (error, data) => {
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