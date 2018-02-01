'use strict';

const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');
const PORT = process.env.PORT;

describe('Route Delete', function() {
  beforeAll(() => server.start(PORT, () => console.log(`listening on ${PORT}`)));
  afterAll(() => server.stop());

  describe('Bad Request DELETE, no ID', () => {
    describe('DELETE /car', () => {
      it('should respond with a status 404', () => {
        return superagent.delete(':4000/api/v1/car')
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });

  describe('Valid Request to the DELETE API', () => {
    describe('DELETE /car', () => {
      it('should respond with a status 204', () => {
        return superagent.delete(':4000/api/v1/mc/5a725c8d20af541da254b808')
          .send({id: '5a725c8d20af541da254b808'})
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
    });
  });
});