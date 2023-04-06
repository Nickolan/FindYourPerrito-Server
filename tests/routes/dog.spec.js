/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: "Perrito",
  image: "https://i.redd.it/iwujsd0cffga1.jpg",
  height: "23 - 29",
  weight: "3 - 6",
  life_span: "10 - 15",
  temperament: ["Active", "Friendly", "Affectionate", "Cooperative", "Cat-like", "Familial"]
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /temperaments', () => {
    it('should get 200', () =>
      agent.get('/temperaments').expect(200)
    );
  })
});

