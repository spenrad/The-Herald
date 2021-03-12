var passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

  passport.use(
    new localStrategy((username, password, done) => {
      console.log("looking for use in localstrat")
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
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

  passport.serializeUser((user, cb) => {
    console.log("serializing")
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    console.log("deserializing")
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        username: user.username,
      };
      cb(err, userInformation);
    });
  });

  module.exports = passport;