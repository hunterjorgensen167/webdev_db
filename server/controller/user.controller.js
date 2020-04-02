const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const userList = [
    {username: 'hunter', password: 'password'},
]

router.post('/', (req, res) => {
    console.dir(req.body)
    if(!req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    userList.push({
        username: req.body.username,
        password: req.body.password,
    });

    res.status(200).send({message: 'Success!', username: req.body.username});
});

router.post('/authenticate', function (req, res) {
    const username = req.body.username;
    const user = userList.find(u => u.username === username);
    if (user && user.password === req.body.password) {
        return res.status(200).send(user)
    }

    res.status(404).send('Failed to authenticate user!');
});


module.exports = router;