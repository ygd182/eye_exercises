var roleCheck  = require('./../middleware/roleCheck');

module.exports = function(passport){

    var express = require('express');
    var router = express.Router();
    var UserController = require('../controllers/userController')();

    router.post('/login', UserController.login);

    router.post('/', UserController.signup);

    router.get('/', [roleCheck.checkRole, UserController.getAll]);

		router.get('/:id', [roleCheck.checkRole, UserController.getById]);

		router.put('/:id', [roleCheck.checkRole, UserController.update]);

		router.delete('/:id',[roleCheck.checkRole, UserController.delete]);
    
    return router;
};
