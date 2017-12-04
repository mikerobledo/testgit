var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var todosSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    todo: { type: String, required: true},
    description:{type: String},
    dateCreated: {type: Date, default: Date.now },
    priority: {type: String},
    dateDue :{ type: Date, default: Date.now},
    completed: { type: Boolean, default: false },
    file: {filename: String, originalName: String}
});
 
module.exports = mongoose.model('todo', todosSchema);