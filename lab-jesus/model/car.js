'use strict';

const mongoose = require('mongoose');
const Make = require('./make');


const Car = mongoose.Schema({
  
  'make': {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'make'},
  'model' : { type: String },
  'mpg': { type: Number },
}, {timestamps: true});

Car.pre('save', function(next) {
  console.log('this: inisde pre:', this);
  Make.findById(this.make)
    .then(make => {
      console.log('make: ehrerere ', make);
      make.car = [...new Set(make.car).add(this._id)];

      // let trackIds = new Set(album.tracks)
      // trackIds.add(this._id)
      // album.tracks = [...trackIds]
      console.log('right before the save');
      make.save();
    })
    .then(next)
    .catch(() => console.log(this));
    // .catch(() => next(new Error('Validation Error. Failed to save Track.')));
});

module.exports = mongoose.model('cars', Car);