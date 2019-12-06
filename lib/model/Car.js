const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2019
  }
});

module.exports = mongoose.model('Cars', schema);
