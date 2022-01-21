require('dotenv').config(); 

let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
let  jsonwebtoken = require("jsonwebtoken");

// Express Route
const contactRoute = require('./routes/contact.route')
const leadRoute = require('./routes/lead.route')
const dealRoute = require('./routes/deal.route')
const taskRoute = require('./routes/task.route')
const userRoute = require('./routes/user.route')
const accountRoute = require('./routes/account.route')


const db = require("./models");
// eslint-disable-next-line no-unused-vars
const Role = db.role;

const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000
};

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, option, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true, //this is the code I added that solved it all
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
}).then(() => {
  console.log('Database sucessfully connected!');
  initial();
},
  error => {
    console.log('Could not connect to database : ' + error);
    //process.exit();
  }
)

const app = express();

require('./routes/auth.route')(app);
require('./routes/user.route')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/contacts', contactRoute)
app.use('/leads', leadRoute)
app.use('/deals', dealRoute)
app.use('/tasks', taskRoute)
app.use('/users', userRoute)
app.use('/accounts', accountRoute)

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});


// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

// 404 Error
app.use((req, res, next) => {
  // eslint-disable-next-line no-undef
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "supervisor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'supervisor' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
  
}
