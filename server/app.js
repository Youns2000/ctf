const express = require('express');
// var request = require('request');
const session = require('express-session');
const app = express();
var mysql = require('mysql');
const register = require('./routes/register')

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


//ROUTES
app.get('/api/user', register)

app.get('/', (req, res) => {
  console.log(req.session)
  const { userId } = req.session;
  res.send()
})

app.get('/home', (req, res) => {

})

app.get('/login', (req, res) => {
  req.session.userId
})

app.get('/register', (req, res) => {
  res.send()
})

app.post('/login', (req, res) => {

})

app.post('/register', (req, res) => {

})

app.post('/logout', (req, res) => {

})





app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})