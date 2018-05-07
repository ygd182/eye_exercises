var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
 
// Thanks to http://blog.matoski.com/articles/jwt-express-node-mongoose/
 
// set up a mongoose model
var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user' 
    }
});
 
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


UserSchema.pre("update", function (next) {

    console.log('entra ',this._update);
    var update = this._update;
    console.log(update);
    //this.ṕassword = update.$set.password;
    bcrypt.hash(update.password, 10, (err, hash) => {
        update.password = hash;
        console.log(update.password);
        next();
    });
});

 
UserSchema.methods.comparePassword = function (passw, cb) {
    console.log(passw, this.password);
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        console.log(err, isMatch);
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);