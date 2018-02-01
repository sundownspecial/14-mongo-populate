'use strict';

const superagent = require('superagent');
const server = require('../../lib/server');
require('jest');
const PORT = process.env.PORT;

//variables
let api = `:${PORT}/api/v1/car`;

describe('Route Delete', function() {
  describe('Bad Request DELETE, no ID', () => {
    beforeAll(() => server.start(PORT, () => console.log(`listening on ${PORT}`)));
    afterAll(() => server.stop());
    describe('DELETE /car', () => {
      it('should respond with a status 404', () => {
        return superagent.delete(`${api}`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });

  describe('Valid Request to the DELETE API', () => {
    beforeAll(() => server.start(PORT, () => console.log(`listening on ${PORT}`)));
    afterAll(() => server.stop());
    describe('DELETE /car', () => {
      it('should respond with a status 204', () => {
        return superagent.delete(`${api}/5a725c8d20af541da254b808`)
          .send({id: '5a725c8d20af541da254b808'})
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
    });
  });
});