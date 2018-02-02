'use strict';

const Make = require('../model/make');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.route('/make/:_id?')
    .get((req, res) => {
      if(req.params._id) {
        return Make.findById(req.params._id)
          .then(album => res.status(200).json(album))
          .catch(err => errorHandler(err, res));
      }

      Make.find()
        .then(albums => albums.map(a => ({_id: a._id, name: a.name})))
        .then(ids => res.status(200).json(ids))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      new Make(req.body).save()
        .then(album => res.status(201).json(album))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      return Make.findByIdAndUpdate(req.params._id,req.body,{upsert: true, runValidators: true, new:true})
        .then((stuff) => res.status(200).json(stuff))
        .catch(err => errorHandler(err, res));
    })
    .delete((req, res) => {
      return Make.findByIdAndRemove(req.params._id)
        .then((stuff) => res.status(200).json(stuff))
        .catch(err => errorHandler(err, res));
    });
  // .put()
};