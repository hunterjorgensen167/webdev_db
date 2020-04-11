const mongoose = require("mongoose")
const PokedexSchema = require('./pokedex.schema').PokedexSchema;

const PokedexModel = mongoose.model("Pokedex", PokedexSchema);

function insertPokedexEntry(pokedexEntry) {
    return PokedexModel.create(pokedexEntry);
}

function getAllPokedexEntries() {
    return PokedexModel.find().exec();
}

function findPokedexEntryByName(name) {
    return PokedexModel.findOne({name}).exec();
}

function findPokedexEntryById(id) {
    return PokedexModel.findById(id).exec();
}

function deletePokedexEntry(id) {
    return PokedexModel.findByIdAndDelete(id).exec();
}

function updatePokedexEntry(pokedexEntry) {
    return PokedexModel.findByIdAndUpdate(pokedexEntry._id, pokedexEntry).exec();
}


module.exports = {
    insertPokedexEntry,
    getAllPokedexEntries,
    findPokedexEntryByName,
    findPokedexEntryById,
    deletePokedexEntry,
    updatePokedexEntry,
};
