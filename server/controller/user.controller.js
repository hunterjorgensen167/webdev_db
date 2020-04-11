const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');
// import bcrypt
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken');
const authParser = require('../middleware/middleware_auth.middleware');



router.post('/', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    return UserModel.addUser(req.body)
        .then((user) => {
                // COMMENT: I am leaving the JWT logic in so you can see the difference
                // Why do we not need to encode the username in session?
                // Why do we not need to set the cookie anymore?
                //
                // const payload = {username};
                // const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                //     expiresIn: '14d'
                // });
                req.session.username = username;
                return res//.cookie('token', token, {httpOnly: true})
                    .status(200).send({username});
            },
            error => res.status(500).send(error));
});

router.post('/authenticate', function (req, res) {
    const {username, password} = req.body;
    UserModel.getUserByUserName(username)
        .then((user) => {
            user.comparePassword(password, (error, match) => {
                if (match) {
                    // Comment: This is the same as above!
                    //
                    // const payload = {username};
                    // const token = jwt.sign(payload, process.env.SUPER_SECRET, {
                    //     expiresIn: '14d'
                    // });
                    req.session.username = username;
                    return res//.cookie('token', token, {httpOnly: true})
                        .status(200).send({username});
                }
                return res.status(400).send("The password does not match");
            });
        })
        .catch((error) => console.error(`Something went wrong: ${error}`));
})
// router.post('/', (req, res) => {
//     if(!req.body.username || !req.body.password) {
//         return res.status(404).send({message: "Must include username AND password"});
//     }
//
//     // req.body.password = bcrypt.hashSync(req.body.password, 10);
//
//     return UserModel.addUser(req.body)
//         .then((user) => {
//             // console.dir(user);
//                 const {username} = user;
//                 const payload = {username};
//                 // JWT is encrypting our payload (which is whatever data we want
//                 // to carry across sessions: in this case, just the username)
//                 // into the cookie based on our SECRET
//                 const token = jwt.sign(payload, process.env.SUPER_SECRET, {
//                     expiresIn: '14d' // optional cookie expiration date
//                 });
//                 // Here we are setting the cookie on our response obect.
//                 // Note that we are returning the username, but that isn't as necessary anymore
//                 // unless we want to reference that on the frontend
//                 return res.cookie('token', token, {httpOnly: true})
//                     .status(200).send({username});
//             // return res.status(200).send(user)
//             },
//             error => res.status(500).send(error));
// });

router.get('/loggedIn', authParser, function(req, res) {
    return res.sendStatus(200);
})

//...

// Can you figure out why authenticate is POST now?
// router.post('/authenticate', function (req, res) {
//     const {username, password} = req.body;
//     UserModel.getUserByUserName(username)
//         .then((user) => {
//             user.comparePassword(password, (error, match) => {
//                 if (match) {
//                     const payload = {username};
//                     // JWT is encrypting our payload (which is whatever data we want
//                     // to carry across sessions: in this case, just the username)
//                     // into the cookie based on our SECRET
//                     const token = jwt.sign(payload, process.env.SUPER_SECRET, {
//                         expiresIn: '14d' // optional cookie expiration date
//                     });
//                     // Here we are setting the cookie on our response obect.
//                     // Note that we are returning the username, but that isn't as necessary anymore
//                     // unless we want to reference that on the frontend
//                     return res.cookie('token', token, {httpOnly: true})
//                         .status(200).send({username});
//                 }
//                 return res.status(400).send("The password does not match");
//             });
//         })
//         .catch((error) => console.error(`Something went wrong: ${error}`));
// });

router.get('/', (req, res) => UserModel.getAllUsers()
    .then(users => res.send(users)));


module.exports = router;