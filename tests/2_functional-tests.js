const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const assertionAnalyser = require('../assertion-analyser');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(1500)
  suite('test /api/convert endpoint', function() {
    test('response to valid inputs', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=3km')
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.initNum, 3)
          assert.equal(res.body.initUnit, 'km')
          assert.equal(res.body.returnNum, 1.86412)
          assert.equal(res.body.returnUnit, 'mi')
          assert.equal(res.body.string, '3 kilometers converts to 1.86412 miles')
          done()
        })
    })
    test('response to invalid unit inputs', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=32g')
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'text/plain')
          assert.equal(res.text, 'invalid unit')
          done()
        })
    })
    test('response to invalid number inputs', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=3/7.2/4kg')
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'text/plain')
          assert.equal(res.text, 'invalid number')
          done()
        })
    })
    test('response to invalid number and unit inputs', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=3/3/3kilograss')
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'text/plain')
          assert.equal(res.text, 'invalid number and unit')
          done()
        })
    })
    test('response to inputs such as "kg"', function(done) {
      chai
        .request(server)
        .get('/api/convert?input=kg')
        .end(function(err, res) {
          assert.equal(res.status, 200)
          assert.equal(res.type, 'application/json')
          assert.equal(res.body.initNum, 1)
          assert.equal(res.body.initUnit, 'kg')
          assert.equal(res.body.returnNum, 2.20462)
          assert.equal(res.body.returnUnit, 'lbs')
          assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds')
          done()
        })
    })
  })
});
