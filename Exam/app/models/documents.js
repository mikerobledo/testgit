
var mongoose = require("mongoose");//connect to mongoose
var Schema = mongoose.Schema;



//define model properties
var Schema = new Schema({
    Property1: {type: String, required: true},
    Property2: {type: Number, required: true}
});

//create and export model
module.exports = 
 mongoose.model('documents', Schema);
