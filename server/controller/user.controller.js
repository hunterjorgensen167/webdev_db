const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');
// import bcrypt
const bcrypt = require("bcryptjs");


router.post('/', (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    // req.body.password = bcrypt.hashSync(req.body.password, 10);

    return UserModel.addUser(req.body)
        .then((user) => {
            // console.dir(user);
            return res.status(200).send(user)
            },
            error => res.status(500).send(error));
});

router.post('/authenticate', function (req, res) {
    UserModel.getUserByUserName(req.body.username)
        .then((user) => {
            // Notice that we're not using bcrypt directly anywhere in the controller.
            // All of that behavior is getting handled closer to the database level/layer
            user.comparePassword(req.body.password, (error, match) => {
                if (match) {
                    res.send(user);
                }
                return res.status(400).send("The password does not match");
            });
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
});

router.get('/', (req, res) => UserModel.getAllUsers()
    .then(users => res.send(users)));


module.exports = router;