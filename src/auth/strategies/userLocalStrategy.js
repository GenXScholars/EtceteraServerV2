const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
let User = require("../../models/userModel");
passport.use('local',
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) next(err);
        if (result) {
          return done(null, user);
        }
      });
    });
  })
);
