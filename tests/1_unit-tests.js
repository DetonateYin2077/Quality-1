const chai = require('chai');
const { suite } = require('mocha');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('convertHandler.getNum', function() {
    test('correctly read a whole number input', function() {
      assert.equal(convertHandler.getNum('3km'), 3)
      assert.equal(convertHandler.getNum('3.L'), 3)
      assert.equal(convertHandler.getNum('3..L'), 'invalid number')
      assert.equal(convertHandler.getNum('3./L'), 'invalid number')
      assert.equal(convertHandler.getNum('3'), 3)
    })
    test('correctly read a decimal number input', function() {
      assert.equal(convertHandler.getNum('3.1km'), 3.1)
      assert.equal(convertHandler.getNum('.21L'), 0.21)
      assert.equal(convertHandler.getNum('.21'), 0.21)
    })
    test('correctly read a fractional input', function() {
      assert.equal(convertHandler.getNum('1/2km'), 1 / 2)
      assert.equal(convertHandler.getNum('1/2'), 1 / 2)
    })
    test('correctly read a fractional input with a decimal', function() {
      assert.equal(convertHandler.getNum('3.1/2.5km'), 3.1 / 2.5)
      assert.equal(convertHandler.getNum('3.1/2.5'), 3.1 / 2.5)
      assert.equal(convertHandler.getNum('3/2.5km'), 3 / 2.5)
      assert.equal(convertHandler.getNum('3/2.5'), 3 / 2.5)
      assert.equal(convertHandler.getNum('3.1/2km'), 3.1 / 2)
      assert.equal(convertHandler.getNum('3.1/2'), 3.1 / 2)
    })
    test('correctly return an error on a double-fraction', function() {
      assert.equal(convertHandler.getNum('3/2/5lbs'), 'invalid number')
      assert.equal(convertHandler.getNum('3/2/5'), 'invalid number')
    })
    test('correctly default to 1 when no numerical input is provided', function() {
      assert.equal(convertHandler.getNum('km'), 1)
      assert.equal(convertHandler.getNum(''), 1)
    })
  })

  suite('convertHandler.getUnit', function() {
    test('correctly read each valid input unit', function() {
      assert.equal(convertHandler.getUnit('3km'), 'km')
      assert.equal(convertHandler.getUnit('mi'), 'mi')
      assert.equal(convertHandler.getUnit('5GaL'), 'gal')
      assert.equal(convertHandler.getUnit('l'), 'L')
      assert.equal(convertHandler.getUnit('1/2kg'), 'kg')
      assert.equal(convertHandler.getUnit('2.5lbs'), 'lbs')
    })
    test('correctly return an error for an invalid input unit', function() {
      assert.equal(convertHandler.getUnit('mil'), 'invalid unit')
      assert.equal(convertHandler.getUnit('k'), 'invalid unit')
      assert.equal(convertHandler.getUnit('5'), 'invalid unit')
      assert.equal(convertHandler.getUnit(''), 'invalid unit')
    })
  })

  suite('converHandler.getReturnUnit', function() {
    test('return the correct return unit for each valid input unit', function() {
      assert.equal(convertHandler.getReturnUnit('mi'), 'km')
      assert.equal(convertHandler.getReturnUnit('km'), 'mi')
      assert.equal(convertHandler.getReturnUnit('gal'), 'L')
      assert.equal(convertHandler.getReturnUnit('L'), 'gal')
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    })
  })

  suite('convertHandler.spellOutUnit', function() {
    test('correctly return the spelled-out string unit for each valid input unit', function() {
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
      assert.equal(convertHandler.spellOutUnit('L'), 'liters')
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    })
  })

  suite('convertHandler.convert', function() {
    test('correctly converts from gal to L', function() {
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541)
      assert.equal(convertHandler.convert(3.78541, 'gal'), 14.32933)
    })
    test('correctly converts from L to gal', function() {
      assert.equal(convertHandler.convert(1, 'L'), 0.26417)
      assert.equal(convertHandler.convert(0.26417, 'L'), 0.06979)
    })
    test('correctly converts from mi to km', function() {
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934)
      assert.equal(convertHandler.convert(1.60934, 'mi'), 2.58998)
    })
    test('correctly converts from km to mi', function() {
      assert.equal(convertHandler.convert(1, 'km'), 0.62137)
      assert.equal(convertHandler.convert(0.62137, 'km'), 0.38610)
    })
    test('correctly converts from lbs to kg', function() {
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359)
      assert.equal(convertHandler.convert(0.45359, 'lbs'), 0.20574)
    })
    test('correctly converts from kg to lbs', function() {
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462)
      assert.equal(convertHandler.convert(2.20462, 'kg'), 4.86036)
    })
  })
});