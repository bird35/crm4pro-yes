// eslint-disable-next-line no-unused-vars
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Contact Model
let contactSchema = require('../Models/Contact');

// CREATE Contact
router.route('/create-contact').post((req, res, next) => {
  contactSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Contacts
router.route('/').get((req, res, next) => {
    // eslint-disable-next-line array-callback-return
    contactSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Contact
router.route('/edit-contact/:_id').get((req, res, next) => {
    contactSchema.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Contact
router.route('/update-contact/:_id').put((req, res, next) => {
    contactSchema.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      // eslint-disable-next-line no-sequences
      return next(error),
      console.log(error)
    } else {
      res.json(data)
      console.log('Contact updated successfully !')
    }
  })
})

// Delete Contact
router.route('/delete-contact/:_id').delete((req, res, next) => {
    contactSchema.findByIdAndRemove(req.params._id, (error, data) => {
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