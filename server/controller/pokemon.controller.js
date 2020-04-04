const express = require('express');
const router = express.Router();

const PokemonAccessor = require('../model/pokemon.model');

router.get('/', (req, res) => {
    if (req.query.username) {
        PokemonAccessor.findPokemonByOwner(req.query.username)
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
    } else {
        return PokemonAccessor.getAllPokemon()
            .then((response) => res.status(200).send(response),
                (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
    }
});

router.post('/', (req, res) => {
    // NOTE: because we're using Mongoose, it will
    // filter out any data that we DON'T want
    // So we can safely pass it the entire body
    return PokemonAccessor.insertPokemon(req.body)
        .then((response) => res.status(200).send(response),
            (error) => res.status(404).send(`Error finding Pokemon:${error}`))
});

router.get('/:id', function (req, res) {
    return PokemonAccessor.findPokemonById(req.params.id)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
});

// router.delete('/:id', function (req, res) {
//     const id = req.params.id;
//     for (var i = pokemons.length - 1; i >= 0; i--) {
//         if (pokemons[i]._id === id) {
//             pokemons.splice(i, 1);
//         }
//     }
//
//     res.status(200).send('Success!');
// });

module.exports = router;