const express = require('express');
const router = express.Router();

const PokemonAccessor = require('../model/pokemon.model');

const authParser = require('../middleware/middleware_auth.middleware');


router.get('/', authParser, function(req, res) {
    PokemonAccessor.findPokemonByOwner(req.username)
        .then((response) => res.status(200).send(response),
            (error) =>  res.status(404).send(`Error finding Pokemon:${error}`));
});

router.post('/', authParser, (req, res) => {
    req.body.owner = req.username;
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