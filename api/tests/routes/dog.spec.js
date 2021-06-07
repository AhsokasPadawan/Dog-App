/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');
const {v4: uuidv4} = require('uuid')

const agent = session(app);
const id = uuidv4();
const dog = {
  name: 'Pug',
  height : '50',
  weight : '35',
  id: id
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    ).timeout(15000);
  });
  describe('GET /dogs/names', () => {
    it('should get 200', () =>
      agent.get('/dogs/names').expect(200)
    ).timeout(15000);
  });
  describe('GET /dogs/search', () => {
    it('should get 200', () =>
      agent.get('/dogs/search').expect(200)
    );
  });
  describe('GET /insertAJokeHere', () => {
    it('should get 404', () =>
      agent.get('/insertAJokeHere').expect(404)
    );
  });
});
