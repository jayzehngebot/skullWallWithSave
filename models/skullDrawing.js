var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var skullSchema = new Schema({
    slug : { type: String, lowercase: true, unique: true },
    name : String,
    skullSVG : String,
    lastupdated : { type: Date, default: Date.now }
});

// export 'Astronaut' model
module.exports = mongoose.model('skullDrawing',skullSchema);