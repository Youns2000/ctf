const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const app = express();
var mongoose = require('mongoose');
const register = require('./routes/api/register')
const login = require('./routes/api/login')
const url = "mongodb+srv://ctfAlgebra:testAlgebra@cluster0.xc7ot.mongodb.net/ctf?retryWrites=true&w=majority"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const TWO_H = 2 * 60 * 60 * 1000;
const {
  port = 5000,
  SESSION_LIFETIME = TWO_H
} = process.env


//SESSION
app.use(session({
  name: 'sess_id',
  resave: false,
  cookie: {
    maxAge: SESSION_LIFETIME,
    samesite: true,
    secure: false
  },
  secret: 'that\'s a secret men',
  saveUninitialized: false
}));

app.use(function (req, res, next) {
  if (req.session.user) {
    req.local.user = req.session.user
  }
  next()
});

//MONGO DB
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
  .then(() => {
    console.log('Connected to Mongo database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the Mongo database. \n${err}`);
  })


//ROUTES
app.use('/api/register', register)
app.use('/api/login', login)


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})