'use strict';

const express = require('express');
const authRouter = express.Router();
const passport = require('passport');


//Perform login, afterwards Auth0 will redirect to callback
authRouter.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (req, res) {
  res.redirect('/');
});

//Perform the final stage of authentication and redirect to previously requested URL or '/user'
authRouter.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if(err) {return next(err);}
    if(!user) {return res.redirect('/login');}

    req.logIn(user, function(err) {
      if(err) {return next(err);}
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/user');
    });
  })(req, res, next);
});

//Perform session logout and redirect to homepage
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
