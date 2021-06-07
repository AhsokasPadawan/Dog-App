const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');
const {v4: uuidv4} = require('uuid')

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());// aca está entrando a buscar el error
      });
      it('should work when its a valid name', (done) => {
        Dog.create({ name: 'Pug' })
        .then(() => done(new Error('It requires every field')))
        .catch(() => done());
      });
      it('should work when its a valid id', () => {
        const id = uuidv4();
        Dog.create({ id: id })
        .then();
      });
      it('should throw an error if id is not uuid  ', (done) => {
        const id = uuidv4();
        Dog.create({id : "not a valid Id"})
          .then(() => done(new Error('It requires a valid id')))
          .catch(() => done());
      });
    });
  });
});
