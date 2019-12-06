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

app.get('/cars/:id', (req, res) => {
  const id = req.params.id;
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

app.put('/cars/:id', (req, res) => {
  const id = req.params.id;
  Car.findByIdAndUpdate(id, req.body, { new: true })
    .then(newItem => {
      res.status(200).send(newItem);
    });
});

module.exports = app;
