'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let initNum = convertHandler.getNum(req.query.input)
    let initUnit = convertHandler.getUnit(req.query.input)
    let returnNum = convertHandler.convert(initNum, initUnit)
    let returnUnit = convertHandler.getReturnUnit(initUnit)

    if (initUnit === 'invalid unit' && initNum === 'invalid number') {
      res.type('txt').send('invalid number and unit')
    } else if (initUnit === 'invalid unit') {
      res.type('txt').send('invalid unit')
    } else if (initNum === 'invalid number') {
      res.type('txt').send('invalid number')
    } else {
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: `${initNum} ${convertHandler.spellOutUnit(initUnit)}` +
          ' converts to ' +
          `${returnNum} ${convertHandler.spellOutUnit(returnUnit)}`
      })
    }

  })

};
