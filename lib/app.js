const express = require('express');
const app = express();
const Car = require('./model/Car');
require('dotenv').config();
require('./utils/connect')();

app.use(express.json());

app.get('/cars', (req, res) => {
  Car.find()
    .then(response => {
      res.status(200).send(response);
    });
  
});

app.get('/cars', (req, res) => {
  const id = req.params;
  Car.findById(id)
    .then(car => {
      res.status(200).send(car);
    });
});

app.post('/cars', (req, res) => {
  const { make, model, year } = req.body;
  Car.create({ make, model, year })
    .then(() => {
      res.status(200).send('Car saved');
    });
});

module.exports = app;
