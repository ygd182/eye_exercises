//ExerciseController.js
'use strict';

var Exercise = require('../models/exerciseModel.js');

module.exports = function(){

  return {

		getAll : function(req, res, next) {
		  Exercise.find(function (err, Exercises) {
		    if (err) return next(err);
		    res.json(Exercises);
		  });
		},

		create: function(req, res, next) {
		  Exercise.create(req.body, function (err, post) {
		    if (err) return next(err);
		    res.json(post);
		  });
		},

		getById: function(req, res, next) {
		  Exercise.findById(req.params.id, function (err, post) {
		    if (err) return next(err);
		    res.json(post);
		  });
		},

		update: function(req, res, next) {
		  Exercise.findByIdAndUpdate(req.params.id, req.body,
		    function (err, post) {
		      if (err) return next(err);
		      res.json(post);
		    });
		},

		delete: function(req, res, next) {
		  Exercise.findByIdAndRemove(req.params.id, req.body,
		    function (err, post) {
		      if (err) return next(err);
		      res.json(post);
		    });
		}

	};

}
