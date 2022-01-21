// eslint-disable-next-line no-unused-vars
let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router(),
  bcrypt = require("bcrypt");

// User Model
let userSchema = require('../Models/User');

/*
// Signup
router.route('/signup').post((req, res, next) => {
  userSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
})
*/

// READ Users
router.route('/').get((req, res, next) => {
    // eslint-disable-next-line array-callback-return
    userSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
})

// Get Single User
router.route('/edit-user/:_id').get((req, res, next) => {
    userSchema.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update User
router.route('/update-user/:_id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(req.params._id, {
  $set: req.body
}, (error, data) => {
  if (error) {
    // eslint-disable-next-line no-sequences
    return next(error),
    console.log(error)
  } else {
    res.json(data)
    console.log('User updated successfully !')
  }
})
})

// Delete User
router.route('/delete-user/:_id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params._id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    };
  })
})

// signup route
router.route("/signup").post((async (req, res) => {
  const body = req.body;

  if (!(body.email && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" })
  };

  // creating a new mongoose doc from user data
  const user = new userSchema(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
})
)

// login route
router.route("/login").post(async (req, res) => {
  const body = req.body;
  const user = await userSchema.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
})


module.exports = router