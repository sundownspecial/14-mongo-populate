'use strict';

const mongoose = require('mongoose');

const Car = mongoose.Schema({
  'make': { type: String},
  'model' : { type: String },
  'mpg': { type: Number },
}, {timestamps: true});

module.exports = mongoose.model('cars', Car);