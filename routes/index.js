/**
 * Loads all router files that will be used in the application. This way,
 * we only need to require this one file in our app.js
 */
var router = require('express').Router();



module.exports = function(passport){
    // Routes are seperated into modules
    router.use('/user', require('./userRoute')(passport));
   	//router.all('*', passport.authenticate());
    router.use('/exercise',[ passport.authenticate(), require('./exerciseRoute') ] );
    

    return router;
};
