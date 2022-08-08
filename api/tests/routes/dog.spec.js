/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
// const { INET } = require('sequelize/types/data-types.js');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, Temperament, conn } = require('../../src/db.js');

const agent = session(app);
const createdDog = {
  name: 'pepe',
  id: 1000,
  height: `50 - 75`,
  weight: `10 - 20`,
  life_span: `5 - 10 years`,
}
const dog = {
  name:'pluto',
  minHeight: 50, 
  maxHeight: 75, 
  minWeight: 20, 
  maxWeight: 30, 
  minLife_span:8, 
  maxLife_span:12, 
  temperament: [1,2,3]
}
const repeatedDog = {
  name:'pepe',
  minHeight: 50, 
  maxHeight: 75, 
  minWeight: 20, 
  maxWeight: 30, 
  minLife_span:8, 
  maxLife_span:12, 
  temperament: [1,2,3]
}
const secondDog = {
  name:'pluto',
  minHeight: 50, 
  maxHeight: 75, 
  temperament: [1,2,3]
}

describe('Dog routes',function () {
  this.timeout(10000)
  before(() => conn.authenticate()
  .then(() => Dog.sync({ force: true }))
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  // beforeEach(() => Dog.sync({ force: true }))
    // .then(() => {
    //   Dog.create(createdDog)
    // }))
    // .then(dog => dog.setTemperaments(temperament)));
  describe('GET /dogs', () => {
    it('should return all Dogs', () => {
      return agent.get('/dogs')
      .then(res => {
        expect(res.body).to.be.an('Array')
        expect(res.body.length).to.be.equal(172)
      })
    })
    it('should return coincident dogs if recieve a name by query', () => {
      return agent.get('/dogs?name=terrier')
      .then(res => {
        expect(res.body).to.be.an('Array')
        expect(res.body.length).to.be.equal(26)
      })
    })
  })
  describe('GET /dogs/:idRaza', () => {
    it('should return an specific dog if recieve an ID by params', async () => {
      const res = await agent.get('/dogs/10')
      expect(res.body).to.be.an('Object')
      expect(res.body.name).to.be.equal('American Bulldog')
    })
  })
  describe('POST /dogs', () => {
    it('should get an error status 404 with message "Complete all information"', () => {
      return agent.post('/dogs')
      .send(secondDog)
      .then(res => {
        expect(res.status).to.be.equal(404)
        expect(res.body.message).to.equal('Complete all information')
      })
    })
    it('should get status 201 with message "Dog saccesfully created"', () => {
      return agent.post('/dogs')
      .send(dog)
      .then(res => {
        expect(res.status).to.be.equal(201)
        expect(res.body.message).to.equal('Dog saccesfully created')
      })
    })
  });
});
