var passport = require("passport");
var passportJWT = require("passport-jwt");
var UserModel = require('../models/UserModel');

var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: 'secretKey',
    jwtFromRequest: ExtractJwt.fromAuthHeader()
  };

module.exports = function() {
  var strategy = new Strategy(params, function(jwt_payload, done) {
    UserModel.findOne({id: jwt_payload.id}, function(err, user) {
      console.log('entra');
          if (err) {
             console.log('---------------anduvo  pero falta el jwt');
              return done(err, false);
          }
          if (user) {
            console.log('---------------anduvo ');
              done(null, user);
          } else {
              console.log('---------------done con false');
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
      return passport.authenticate("jwt", {session: false});
    }
  };
};