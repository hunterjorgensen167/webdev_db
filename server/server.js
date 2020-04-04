const express = require('express');
const user = require('./controller/user.controller');
const pokemon = require('./controller/pokemon.controller');
const item = require('./controller/items.controller');

const app = express();

const mongoose = require('mongoose');


// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb://127.0.0.1/pokemon_app';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes
app.use('/api/pokemon', pokemon);
app.use('/api/user', user);
app.use('/api/items', item);

app.listen(3001, function() {
    console.log('Starting server');
});