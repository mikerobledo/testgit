var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myPicSchema = new Schema({
        userId: { type: Schema.Types.ObjectId, required: true },
        mypic: { type: String, requred: true },
        description:{type: String},
        dateCreated: {type:Date, default:Date.now},
       
    });
    
    module.exports = 
     mongoose.model('mypics', myPicSchema);