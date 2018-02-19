var roleCheck  = require('./../middleware/roleCheck');

module.exports = function(passport){

    var express = require('express');
    var router = express.Router();
    var UserController = require('../controllers/userController')();

    router.post('/login', UserController.login);

    router.post('/',[ /*passport.authenticate(), roleCheck.checkAdminRole,*/ UserController.signup]);

    router.get('/', [ passport.authenticate(), roleCheck.checkAdminRole, UserController.getAll]);

	router.get('/:id', [passport.authenticate(), roleCheck.checkAdminRole, UserController.getById]);

	router.put('/:id', [passport.authenticate(), roleCheck.checkAdminRole, UserController.update]);

	router.delete('/:id',[passport.authenticate(), roleCheck.checkAdminRole, UserController.delete]);
    
    return router;
};
