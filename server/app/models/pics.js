var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var picSchema = new Schema({
        Id: { type: Schema.Types.ObjectId, required: false },
        file: {
            fileName: { type: String},
            originalName: {type: String},
            dateUploaded: {type: Date, default: Date.now}
        },
    });
    
    module.exports = 
     mongoose.model('pics', picSchema);