'use strict';

const express = require('express');
const session = require('express-session');
const dontenv = require('dotenv');
dontenv.config();
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const userInViews = require('./middleware/user-in-views.js');
const authRouter = require('./routes/auth.js');
const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const app = express();

app.set('view engine', 'pug');

let sess = {
  secret: process.env.AUTH0_CLIENT_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; //serve secure cookies, requires https
}

let strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
});

app.use(session(sess));
passport.use(strategy);
app.use(passport.initialize()); // needs to be after app.use(session(sess))
app.use(passport.session()); // needs to be after app.use(session(sess))


app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', usersRouter);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
