const Benchmark = require('benchmark');
const faker = require('faker');
const { getProcessArg } = require('./utils/process');

const ROUNDS = parseInt(getProcessArg('ROUNDS')) || 100;

console.log(`Generating ${ROUNDS} sets of data...`);

const fixture = new Array(ROUNDS).fill(null).map(() => faker.helpers.userCard());
const suite = new Benchmark.Suite;

console.log(`Measurement...`)
suite
  .add('Reduce - left references', () => {
    fixture.reduce((acc, curr) => {
      const city = curr.address.city;
      return {
        ...acc,
        [city]: (acc[city] || 0) + 1
      }
    }, {});
  })
  .add('Reduce - save reference', () => {
    fixture.reduce((acc, curr) => {
      const city = curr.address.city;
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});
  })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log(`Fastest is "${this.filter('fastest').map('name')}"`);
  })
  .run();

