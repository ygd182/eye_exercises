var express = require('express');
var router = express.Router();
var roleCheck  = require('./../middleware/roleCheck');

var exerciseController = require('../controllers/exerciseController.js')();

router.get('/', exerciseController.getAll);

router.get('/:id', exerciseController.getById);

router.post('/', [roleCheck.checkAdminRole, exerciseController.create]);

router.put('/:id', [roleCheck.checkAdminRole,exerciseController.update]);

router.delete('/:id', [roleCheck.checkAdminRole, exerciseController.delete]);

module.exports = router;
