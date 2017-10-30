
var mongoose = require("mongoose"); //connect to mongoose
var Schema = mongoose.Schema;



//define model properties
var Schema = new Schema({
    Property1: {type: String, required: false},
    Property2: {type: Number, required: false}
});

//create and export model
module.exports = 
 mongoose.model('documents', Schema);
