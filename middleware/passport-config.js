var passport = require("passport");
var passportJWT = require("passport-jwt");
var UserModel = require('../models/userModel');

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: process.env.secret_jwt_key,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
  };

module.exports = function() {
  var strategy = new Strategy(params, function(jwt_payload, done) {
    UserModel.findOne({_id: jwt_payload._id}, function(err, user) {
          if (err) {
            return done(err, false);
          }
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  });

  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", { /*failureRedirect: '/login.html',   */                                         
                                            session: false });
    }
  };
};