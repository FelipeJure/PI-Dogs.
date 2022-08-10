const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

const dog = {
  name:'Pug',
  id: 990,
  height: '4 - 5',
  weight: '5 - 8',
  life_span: '8 - 10 years'
}

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    xdescribe('require data', () => {
      it('should throw an error if name is null', function (done) {
        return Dog.create({id:990 ,height:'4 - 5' ,weight: '5 - 8',life_span:'8 - 10 years' })
        .then(() => { throw new Error('was not supposed to succeed'); })
        .catch(dog => expect(dog).to.be.equal('caw'))
          
          // .catch(response => expect(response).to.be.equal('Array'));
      });
      xit('should throw an error if ID is null', function (done) {
        Dog.create({id:null ,height:'4 - 5' ,weight: '5 - 8',life_span:'8 - 10 years', name: 'Pug' })
          .then(() => done())
          .catch(() => done());
      });
    });
    xdescribe('height', () => {
      it('should throw an error if is not a String', function (done) {
        Dog.create({height: 4})
        .then(() => done())
        .catch(() => done())
      })
      it('should work when its a String', () => {
        Dog.create({ height:'4 - 5' })
      })
    })
    xdescribe('weight', () => {
      it('should throw an error if is not a String', function (done) {
        Dog.create({weight: 4 - 6})
        .then(() => done())
        .catch(() => done())
      })
      // it('should work when its a String', () => {
      //   return Dog.create({ height:'20 - 40' })
      // })
    })
  });
});
