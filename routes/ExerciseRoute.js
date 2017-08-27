var express = require('express');
var router = express.Router();

var Exercise = require('../models/ExerciseModel.js');

router.get('/', function(req, res, next) {
  Exercise.find(function (err, Exercises) {
    if (err) return next(err);
    res.json(Exercises);
  });
});

router.post('/', function(req, res, next) {
  Exercise.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', function(req, res, next) {
  Exercise.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', function(req, res, next) {
  Exercise.findByIdAndUpdate(req.params.id, req.body,
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

router.delete('/:id', function(req, res, next) {
  Exercise.findByIdAndRemove(req.params.id, req.body,
    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

module.exports = router;
