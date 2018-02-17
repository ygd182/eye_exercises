var roleCheck  = require('./../middleware/roleCheck');

module.exports = function(passport){

    var express = require('express');
    var router = express.Router();
    var UserController = require('../controllers/userController')();

    router.post('/login', UserController.login);

    router.post('/',[roleCheck.checkAdminRole, UserController.signup]);

    router.get('/', [roleCheck.checkAdminRole, UserController.getAll]);

	router.get('/:id', [roleCheck.checkAdminRole, UserController.getById]);

	router.put('/:id', [roleCheck.checkAdminRole, UserController.update]);

	router.delete('/:id',[roleCheck.checkAdminRole, UserController.delete]);
    
    return router;
};
