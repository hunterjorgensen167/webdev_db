const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const pokemons = [{_id: '1234', owner: 'hunter', name: 'pikachu', birthday: new Date(1990, 12, 15), health: 100},
    {_id: '2345', owner: 'hunter', name: 'charizard', birthday: new Date(2010, 5, 11), health: 150}];

router.get('/', (req, res) => {
    if (req.query.username) {
        const response = pokemons.filter(p => p.owner === req.query.username);
        return res.status(200).send(response)
    }

    res.send(pokemons)
});

router.post('/', (req, res) => {
    const body = req.body;
    const id = uuidv4();
    pokemons.push({
        _id: id,
        name: body.name,
        color: body.color,
        health: body.health,
        owner: body.owner,
    });
    res.status(200).send({message: 'Success!', id: id});
});

router.get('/:id', function (req, res) {
    const id = req.params.id;
    const response = pokemons.find(pokemon => pokemon._id === id);
    if (response) {
        return res.status(200).send(response)
    }

    res.status(404).send({error: 'No Pokemon found for that ID!'});
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const response = pokemons.find((pokemon) => pokemon._id === id);
    if (!response) {
        return res.state(404).send({error: 'Pokemon not found!'});
    }

    response.name = body.name;
    response.color = body.color;
    response.health = body.health;

    res.status(200).send('Success!');
});

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    for (var i = pokemons.length - 1; i >= 0; i--) {
        if (pokemons[i]._id === id) {
            pokemons.splice(i, 1);
        }
    }

    res.status(200).send('Success!');
});

module.exports = router;