let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

// Express Route
const contactRoute = require('./routes/contact.route')
const leadRoute = require('./routes/lead.route')
const dealRoute = require('./routes/deal.route')
const taskRoute = require('./routes/task.route')
const userRoute = require('./routes/user.route')
const accountRoute = require('./routes/account.route')

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
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