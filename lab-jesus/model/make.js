'use strict';

const mongoose = require('mongoose');

const Make = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  car: [{type: mongoose.Schema.Types.ObjectId, ref: 'car'}],
});

module.exports = mongoose.model('make', Make);