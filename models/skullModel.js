var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var skullSchema = new Schema({
    name : String,
    skull : String
    //slug : { type: String, lowercase: true, unique: true },
    //stackOrder : String,
    //lastUpdated : { type: Date, default: Date.now }
});

// export 'Astronaut' model
module.exports = mongoose.model('skullModel',skullSchema);