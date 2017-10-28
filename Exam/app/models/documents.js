
var mongoose = require("mongoose");
var Schema = Mongoose.Schema;


var Schema = new Schema({
    Documentname: {type: String, required: true},
    Documentcontent: {type: String, required: true},
    dateCreated: {tpe: Date, default: Date.now},
    status: {type: Boolean, default: true}

});

module.exports = 
 Mongoose.model('documents', mySchema);

