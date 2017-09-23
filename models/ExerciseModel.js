var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

/*{
 "from": { "top": 100.15, "left": 50},
 "to": { "top": 200.15, "left": 50},
 "blink": false,
 "blinkSpeed": 0,
 "reps": 0,
 "duration": 5000,
 "name": "exercise1"
}*/


var ExerciseSchema = new Schema ({ 
	/*from: {
        top: SchemaTypes.Double,
        left: SchemaTypes.Double
    },*/
    fromId: Number,
    /*to: {
        top: SchemaTypes.Double,
        left: SchemaTypes.Double
    },*/
    toId: Number,
    name: String,
    blink: Boolean,
    blinkSpeed: SchemaTypes.Double,
    reps: Number,
    duration: SchemaTypes.Double,
    rest: SchemaTypes.Double
});

module.exports = mongoose.model('Exercise', ExerciseSchema);