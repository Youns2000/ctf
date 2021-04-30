const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const cookieParser = require('cookie-parser')
const apiRouter = require('./routes/api');

JWTStrategy = passportJWT.Strategy

const app = express();
app.use(passport.initialize())
app.use(cors())

const user = {
  id: "1",
  email: "exemple@email.com",
  password: "password"
}

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  if (email === user.email && password === user.password) {
    return done(null, user)
  }
  else {
    return done(null, false)
  }
}))

passport.use(new JWTStrategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "hard_token_men"
}, (jwt_payload, done) => {
  if (user.id === jwt_payload.user._id) {
    return done(null, user)
  } else {
    return done(null, false, {
      message: "Token not matched"
    })
  }
}
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "client/build")))
//ROUTES
app.use('/api', apiRouter);
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "/client/build/index.html"))
})



//SESSION
const TWO_H = 2 * 60 * 60 * 1000;
const {
  port = 8080,
  SESSION_LIFETIME = TWO_H
} = process.env

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



//MONGO DB
var mongoose = require('mongoose');
const url = "mongodb+srv://ctfAlgebra:testAlgebra@cluster0.xc7ot.mongodb.net/ctf?retryWrites=true&w=majority"

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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})