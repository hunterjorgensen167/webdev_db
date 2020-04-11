const express = require('express');
const router = express.Router();

const PokedexAccessor = require('../model/pokedex.model');





router.get('/', (req, res) => {
    return PokedexAccessor.getAllPokedexEntries()
        .then((entries) => res.send(entries[0]))
})

router.post('/', async (req, res) => {
    try {
        let entry = await PokedexAccessor.findPokedexEntryByName(req.body.name);
        if (entry) {
            return res.status(403).send('Pokedex entry with that name already exists');
        }
        entry = await PokedexAccessor.insertPokedexEntry(req.body);
        res.status(200).send(entry)
    } catch (error) {
        res.status(404).send(`Error inserting Pokedex Entry:${error}`)
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    return PokedexAccessor.updatePokedexEntry(req.body)
        .then((entry) => res.send(entry),
            (error) => res.status(500).send(error));
})

router.post('/', (req, res) => {
    return PokedexAccessor.findPokedexEntryByName(req.body.name)
        .then((entry) => {
            if (entry) {
                res.status(403).send('Entry with that name already exists!')
            } else {
                return PokedexAccessor.insertPokedexEntry(req.body)
                    .then((entry) => {
                        res.status(200).send(entry)
                    })
            }
        })
        .catch((error) => res.status(500).send(`Error inserting Pokedex Entry:${error}`))
});


module.exports = router