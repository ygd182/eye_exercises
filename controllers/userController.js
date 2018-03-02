//UserController.js
'use strict';

var jwt = require('jwt-simple');
var UserModel = require('../models/userModel');

// route middleware to ensure user is logged in


module.exports = function(){

var config = { secret: process.env.secret_jwt_key };
    

    return {

        isLoggedIn: function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
         
            res.sendStatus(401);
        },

        login: function login(req, res) {
             UserModel.findOne({email: req.body.email}, function(err, user) {
                if (err) throw err;

                if (!user) {
                  res.send({success: false, msg: 'Authentication failed. User not found.'});
                } else {
                  // check if password matches
                  user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                      // if user is found and password is right create a token
                      var token = jwt.encode(user, config.secret);
                      // return the information including token as JSON
                      res.json({success: true, token: 'JWT ' + token, email: user.email, role: user.role});
                    } else {
                      res.status(401);
                      res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                  });
                }
            });
        },

        getAll : function(req, res, next) {
          UserModel.find(function (err, UserModels) {
            if (err) return next(err);
            res.json(UserModels);
          });
        },

        getById: function(req, res, next) {
          UserModel.findById(req.params.id, function (err, post) {
            if (err) return next(err);
            res.json(post);
          });
        },

        update: function(req, res, next) {
          UserModel.findByIdAndUpdate(req.params.id, req.body,
            function (err, post) {
              if (err) return next(err);
              res.json(post);
            });
        },

        delete: function(req, res, next) {
          UserModel.findByIdAndRemove(req.params.id, req.body,
            function (err, post) {
              if (err) return next(err);
              res.json(post);
            });
        },

        logout: function logout(req, res) {
            req.logout();
            res.send("logout success!");
            /*
            req.session.destroy(function (err) {
                res.redirect('/'); //Inside a callback… bulletproof!
              });
            */
        },

        signup: function(req, res) {
          if (!req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please enter email and password.'});
          } else {
            var newUser = new UserModel({
              email: req.body.email,
              password: req.body.password,
              role: req.body.role
            });
            // save the user
            newUser.save(function(err) {
              if (err) {
                return res.json({success: false, msg: 'Email already exists.'});
              }
              res.json({success: true, msg: 'Successful created new user.'});
            });
          }
        }
    }
};