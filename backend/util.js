import jwt from 'jsonwebtoken';
import config from './config';
const passport = require('passport');
const User = require('./models/userModel');
const FacebookTokenStrategy = require('passport-facebook-token');

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

exports.getTokenForFacebook = user => {
  return jwt.sign(user, config.secretKey, {expiresIn: 3600});
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

exports.facebookPassport = passport.use(
  new FacebookTokenStrategy(
      {
          clientID: config.facebook.clientId,
          clientSecret: config.facebook.clientSecret
      },
      (accessToken, refreshToken, profile, done) => {
          User.findOne({facebookId: profile.id}, (err, user) => {
              if (err) {
                  return done(err, false);
              }
              if (!err && user) {
                  return done(null, user);
              } else {
                  user = new User({ username: profile.displayName });
                  user.facebookId = profile.id;
                  user.firstname = profile.name.givenName;
                  user.lastname = profile.name.familyName;
                  user.save((err, user) => {
                      if (err) {
                          return done(err, false);
                      } else {
                          return done(null, user);
                      }
                  });
              }
          });
      }
  )
);

export { getToken, isAuth, isAdmin };
