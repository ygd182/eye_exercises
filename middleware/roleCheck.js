var UserModel = require('../models/userModel');

module.exports =  {
  checkAdminRole: function(req, res, next) {
    var user = req.user;
    if(user.role != 'admin') {
      let err = new Error();
      err.status = 401;
      err.message = `User doesn't have the privileges to use this resource.`;
      return next(err);
    }
    return next();
  }
};