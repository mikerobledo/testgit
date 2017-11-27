
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var Bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    dateRegistered: {type: Date, default: Date.now},
    status: {type: Boolean, default: true}

});

// UserSchema.pre('save', function (next) {
//     var person = this;
//     if (this.isModified('password') || this.isNew) { 
//        Bcrypt.genSalt(10, function (err, salt) {
//             if (err) { 
//                return next(err); 
//            }
//             Bcrypt.hash(person.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 person.password = hash;
//                 next();
//             });
//         });
//     } else { 
//        return next();
//     }
// });

// UserSchema.methods.comparePassword = function (passw, cb) {
//     Bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };


UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Users', UserSchema);

