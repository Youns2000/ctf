const express = require('express');
const session = require('express-session');
const path = require('path');
const User = require('./models/user');
const cors = require('cors');
const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');
const jwt = require("jsonwebtoken");
var mongoose = require('mongoose');

JWTStrategy = passportJWT.Strategy

const app = express();
app.use(passport.initialize());
app.use(cookieParser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkw"));
app.use(passport.session());
app.use(cors());


passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      // if (!user.actived) {
      //   console.log("Not Activated");
      //   return done(null, false);
      // }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (result === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    });
  })
);


passport.use(new JWTStrategy({
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkw"
}, (jwt_payload, done) => {
  User.findOne({ _id: jwt_payload.user._id }, (err, user) => {
    if (err) throw err;
    if (!user) return done(null, false);
    return done(null, user);
  });
}
))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "client/build")))
//ROUTES
app.use('/api', apiRouter);
app.get("*", (req, res) => {
  return res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

app.post('/confirm', async (req, res) => {
  try {
    const { email } = jwt.verify(req.body.token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkw');
    console.log(email)
    User.findOne({ email: email }, async (err, user) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      else if (user === null) {
        res.send(false);
        return;
      }
      user.actived = true;
      user.save(function (err) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.send(true);
      });
    })
    // await User.update({ activated: true }, { where: { id } });
  } catch (e) {
    res.send(e);
  }

  // res.redirect('http://localhost:3000/Login');
});




//SESSION
const TWO_H = 2 * 60 * 60 * 1000;
const {
  port = process.env.PORT || 5000,
  SESSION_LIFETIME = TWO_H
} = process.env

// app.use(session({
//   name: 'sess_id',
//   resave: false,
//   cookie: {
//     maxAge: SESSION_LIFETIME,
//     samesite: true,
//     secure: false
//   },
//   secret: 'that\'s a secret men',
//   saveUninitialized: false
// }));



//MONGO DB
const url = "mongodb://ctf:tRmW97afbONtMBj8RENYWUWGdpCJok330iwtM3HOrAlnOVJvLvthIW9pf6wVHEntPIJP0GIoYscjvgcFMRhR9A==@ctf.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ctf@"

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

// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send(err.message);
// });

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})