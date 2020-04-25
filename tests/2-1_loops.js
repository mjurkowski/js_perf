const Benchmark = require('benchmark');
const faker = require('faker');
const { getProcessArg } = require('./utils/process');

const ROUNDS = parseInt(getProcessArg('ROUNDS')) || 100;

console.log(`Generating ${ROUNDS} sets of data...`);

const fixture = new Array(ROUNDS)
  .fill(null)
  .map(() => faker.helpers.userCard());
const suite = new Benchmark.Suite();

console.log(`Measurement...`);
suite
  .add('Loops#reduce', () => {
    fixture.reduce((acc, curr) => {
      const city = curr.address.city;
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});
  })
  .add('Loops#for', () => {
    let testData = {};
    for (let i = 0; i < fixture.length; i++) {
      const city = fixture[i].address.city;
      testData[city] = (testData[city] || 0) + 1;
    }
  })
  .add('Loops#forEach', () => {
    let testData = {};
    fixture.forEach((curr) => {
      const city = curr.address.city;
      testData[city] = (testData[city] || 0) + 1;
    });
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log(`Fastest is "${this.filter('fastest').map('name')}"`);
  })
  .run();
