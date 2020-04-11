const Schema = require('mongoose').Schema;

exports.PokedexSchema = new Schema({
    // recall that _id is provided for us, though we can add other indices
    name: { type: String, index: {unique: true}},
    heightInCentimeters: { type: Number, required: true},
    category: String,
    ability: String,
    weightInKilos: Number,
    type: [String],
// set the collection (i.e., 'table') name below
}, { collection : 'pokedex' });