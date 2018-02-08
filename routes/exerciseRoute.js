var express = require('express');
var router = express.Router();

var exerciseController = require('../controllers/exerciseController.js')();

router.get('/', exerciseController.getAll);

router.post('/', exerciseController.create);

router.get('/:id', exerciseController.getById);

router.put('/:id', exerciseController.update);

router.delete('/:id', exerciseController.delete);

module.exports = router;
