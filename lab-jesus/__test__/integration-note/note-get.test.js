'use strict';

const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');
const PORT = process.env.PORT;
let api = `:${PORT}/api/v1/car`;


describe('Route Delete', function() {
  beforeAll(() => server.start(PORT, () => {
    console.log(`listening on ${PORT}`);
  }));
  afterAll(() => server.stop());


  ///stuff
  describe('Route Testing', () => {
    this.testCar = { make: 'Honda', model: 'Civic', mpg: 28 };
    beforeAll(() => server.start(PORT, () => console.log(`listening on ${PORT}`)));
    afterAll(() => server.stop());

    describe('PUT /api/v1/car', () => {
      beforeAll(() => {
        return superagent.post(api)
          .send(this.testCar)
          .then(res => this.response = res)
          .then(() => this.testCar._id = this.response.body._id);
      });

      describe('Valid Routes/Data', () => {
        it('Should respond with a status 204', () => {
          this.testCar.content = 'updated';
          return superagent.put(`${api}/${this.testCar._id}`)
            .send(this.testCar)
            .then(res => {
              expect(res.status).toBe(204);
            });
        });
      });
      describe('Invalid Routes/Data', () => {
        it('Should return a status 400 if data is not sent with the put request', () => {
          return superagent.put(`${api}/${this.testCar._id}`)
            .catch(err => expect(err.status).toBe(400));
        });
      });
    });
  });});