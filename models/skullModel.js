var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define a new schema
var skullSchema = new Schema({
    name : String,
    slug : { type: String, lowercase: true, unique: true },
    cred : String, //person who created this skull
    skull : String,
    candles : Number,
	created : { type: Date, default: Date.now }
});

// export 'Astronaut' model
module.exports = mongoose.model('skullModel',skullSchema);