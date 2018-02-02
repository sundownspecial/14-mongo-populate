'use strict';

const Car = require('../model/car');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  // router.get()
  // router.post()

  // Below is another example of mounting route methods to the router
  router.route('/car/:_id?')
    .get((req, res) => {
    // debug(`${req.method}: ${req.url}`)
      if(req.params._id) {
        return Car.findById(req.params._id)
          .then(track => res.status(200).json(track))
          .catch(err => errorHandler(err, res));
      }
      return Car.find()
        .then(track => res.status(200).json(track))
        .catch(err => errorHandler(err, res));
    // otherwise handle the case of no ID

    })
    .post(bodyParser, (req, res) => {
      console.log('yoooo');
      console.log(req.body);
      new Car(req.body).save()
        .then(car => res.status(201).json(car))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      return Car.findByIdAndUpdate(req.params._id,req.body,{upsert: true, runValidators: true, new:true})
        .then((stuff) => res.status(200).json(stuff))
        .catch(err => errorHandler(err, res));
    })
    .delete((req, res) => {

      return Car.findByIdAndRemove(req.params._id)
        .then((stuff) => res.status(200).json(stuff))
        .catch(err => errorHandler(err, res));
      // router.delete('/note/:id', (req, res) => {
      //   storage.destroy('note', req.params.id)
      //     .then(item => res.status(204).json(item))
      //     .catch(err => errorHandler(err, res));
      // });
    });
};