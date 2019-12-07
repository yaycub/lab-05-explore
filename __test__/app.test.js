const request = require('supertest');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const app = require('../lib/app');
const car = require('../lib/model/Car');

describe('app routes tests', () => {
  beforeAll(done => {
    connect();
    done();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  afterAll(done => {
    mongoose.connection.close();
    done();
  });

  it('can get all cars from a cars route', async() => {
    const responseCarId = await car.create({
      make: 'Toyota',
      model: 'Camry',
      year: '2018'
    }).then(result => result._id);
    return request(app)
      .get('/cars')
      .then(response => {
        expect(JSON.stringify(response.body)).toEqual(`[{"_id":"${responseCarId}","make":"Toyota","model":"Camry","year":2018,"__v":0}]`);
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
        expect(JSON.parse(response.text)).toEqual({ 'make': 'Toyota', 'model': 'Camry', 'year': '2018' });
      });
  });

  it('can get a single car by ID', async() => {
    const responseCarId = await car.create({
      make: 'Toyota',
      model: 'Camry',
      year: '2018'
    }).then(result => result._id);
    return request(app)
      .get(`/cars/${responseCarId}`)
      .then(response => {
        expect(JSON.stringify(response.body)).toEqual(`{"_id":"${responseCarId}","make":"Toyota","model":"Camry","year":2018,"__v":0}`);
      });
  });

  it('can update a single car by Id', async() => {
    const responseCarId = await car.create({
      make: 'Toyota',
      model: 'Camry',
      year: '2018'
    }).then(result => result._id);
    return request(app)
      .put(`/cars/${responseCarId}`)
      .send({
        make: 'Nissan'
      })
      .then(response => {
        expect(JSON.stringify(response.body)).toEqual(`{"_id":"${responseCarId}","make":"Nissan","model":"Camry","year":2018,"__v":0}`);
      });
  });

  it('can find an car by ID and delete that car', async() => {
    const responseCarId = await car.create({
      make: 'Toyota',
      model: 'Camry',
      year: '2018'
    }).then(result => result._id);
    return request(app)
      .delete(`/cars/${responseCarId}`)
      .then(response => {
        expect(JSON.stringify(response.body)).toEqual(`{"_id":"${responseCarId}","make":"Toyota","model":"Camry","year":2018,"__v":0}`);
      });
  });
});
