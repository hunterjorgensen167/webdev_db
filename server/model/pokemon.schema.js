// We are using the Schema Class here
// This allows us to declare specifically what is IN the
// document and what is not
const Schema = require('mongoose').Schema;


exports.PokemonSchema = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    owner: String,
    name: String,
    birthday: {
        type: Date,
        default: Date.now,
    },
    health: {type: Number},
// this explicitly declares what collection we're using
}, { collection : 'pokemons' });