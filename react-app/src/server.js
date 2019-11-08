/* server.js*/
'use strict';
const log = console.log;

const express = require('express');

const bodyParser = require('body-parser'); // middleware for parsing HTTP body
const app = express();
const {ObjectID} = require('mongodb');

const User = require('./models/user.js');
const Restaurant = require('./models/restaurant.js');

/* Use statements for the server */
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./mongoose').connect();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Brad', lastName: 'Traversy'},
        {id: 3, firstName: 'Mary', lastName: 'Swanson'},
    ];

    res.json(customers);
});

app.post("/user/signup", (req, res) => {
    log(req.body);
    const user = new User({
        accountType: req.body.accountType,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        tel: req.body.tel,
        manager: req.body.manager
    });

    user.save()
        .then(user => {
            res.send("user " + user.username + " saved to database");
        })
        .catch(err => {
            log(err);
            res.status(400).send(err);
        });
});

app.get('/api/users', (req, res) => {
    User.find({}, function (err, users) {
        if (err) {
            log(err);
            return err;
        }

        res.send(users);
    });
});

app.get('/api/restaurants', (req, res) => {
    Restaurant.find({}, function (err, restaurants) {
        if (err) {
            log(err);
            return err;
        }
        res.send(restaurants);
    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(() => {
            res.json('User ' + id + ' deleted.');
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});

app.delete('/api/restaurants/:id', (req, res) => {
    const id = req.params.id;
    Restaurant.findByIdAndDelete(id)
        .then(() => {
            res.json('Restaurant ' + id + ' deleted.');
        })
        .catch(err => {
            res.status(400).json('Error: ' + err);
        });
});


app.get("/user/info", (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(400).json('Err ' + error));
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    log('Listening on port 5000...');
});
