
var mongoose = require("mongoose");
var Schema = Mongoose.Schema;


var UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateRegistered: {tpe: Date, default: Date.now},
    status: {type: Boolean, default: true}

});

module.exports = 
 Mongoose.model('Users', mySchema);

