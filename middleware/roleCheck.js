var UserModel = require('../models/userModel');

module.exports =  {
  checkRole: function(req, res, next) {
    var token = req.header('x-auth');
    UserModel.findOne({id: token},function (err, user) {
      if (err) return next(err);
      if(user.role != 'admin') {
        let err = new Error();
        err.status = 401;
        err.message = `User doesn't have the privileges to use this resource.`;
        return next(err);
      }
      console.log(user);
      return next(user);
    });
  }
};