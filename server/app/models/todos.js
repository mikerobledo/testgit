var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
 
var todosschema = new Schema({
    userid: { type: Schema.Types.ObjectId, required:true },
    todo: { type: String, required:true},
    description:{type:String},
    dateCreated: {type: Date, default:Date.now},
    dateDue :{ type:Date, default:Date.now},
    completed: { type: Boolean, default: Boolean.false },
    file: {filename:String, originalName:String}
});
 
module.exports =
Mongoose.model('todo', todosSchema);