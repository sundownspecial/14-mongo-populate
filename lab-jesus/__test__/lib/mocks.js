'use strict';

const faker = require('faker');
const Make = require('../../model/make');
const Car = require('../../model/car');

const mock = module.exports = {};

// Make Mocks - One, Many, RemoveAll
mock.make = {};

mock.make.createOne = () => new Make({ name: faker.hacker.adjective() }).save();

mock.make.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.make.createOne));

mock.make.removeAll = () => Promise.all([Make.remove()]);


// Car Mocks - One, Many, RemoveAll
mock.car = {};

mock.car.createOne = () => {
  let result = {};

  return mock.make.createOne()
    .then(make => {
      result.make = make;
      return new Car({
        artist: `${faker.name.firstName()} ${faker.name.lastName()}`,
        title: faker.hacker.ingverb(),
        make: make._id.toString(),
      }).save();
    })
    .then(car => result.car = car)
    .then(() => result);
};

mock.car.createMany = n => {
  let result = {};
//requests
  return mock.make.createOne()
    .then(make => {
      result.make = make;
      let carProms = new Array(n).fill(0).map(() => new Car({
        mpg: faker.finance.account(),
        model: faker.hacker.ingverb(),
        make: make._id.toString(),
      }).save());
      return Promise.all(carProms);
    })
    .then(cars => result.cars = cars)
    .then(() => result);
};

mock.car.removeAll = () => Promise.all([Car.remove()]);