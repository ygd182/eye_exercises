var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;


var PartSchema = new Schema ({ 
    fromId: Number,
    toId: Number,   
    blink: Boolean,
    blinkSpeed: SchemaTypes.Double,
    duration: SchemaTypes.Double,
});

var ExerciseSchema = new Schema ({ 
    parts: [PartSchema],
    name: String,
    reps: Number,
    rest: SchemaTypes.Double
});

module.exports = mongoose.model('Exercise', ExerciseSchema);