const request = require('supertest');
const app = require('../lib/app');

describe('app routes tests', () => {
  it('can get all cars from a cars route', () => {
    return request(app)
      .get('/cars')
      .then(response => {
        expect(response.body).toContainEqual({
          '__v': 0, '_id': '5deae0ad8dde6ad4ab0354bc', 'make': 'Toyota', 'model': 'Camry', 'year': 2018
        });
      });
  });

  it('has a post route at /cars', () => {
    return request(app)
      .post('/cars')
      .send({
        make: 'Toyota',
        model: 'Camry',
        year: '2018'
      })
      .then(response => {
        expect(response.text).toEqual('Car saved');
      });
  });

  it('can get a single car by ID', () => {
    return request(app)
      .get('/cars/5deae0ad8dde6ad4ab0354bc')
      .then(response => {
        expect(response.body).toEqual({
          '__v': 0, '_id': '5deae0ad8dde6ad4ab0354bc', 'make': 'Toyota', 'model': 'Camry', 'year': 2018
        });
      });
  });
});
