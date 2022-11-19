'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    let result = {};

    let numberError = false, unitError = false, errorMsg;
    try {
      result.initNum = convertHandler.getNum(input);
    } catch (error) {
      numberError = true;
      errorMsg = error.message;
    }
    try {
      result.initUnit = convertHandler.getUnit(input);
    } catch (error) {
      unitError = true;
      errorMsg = error.message;
    }
    if (numberError) {
      return res.send(unitError ? "invalid number and unit" : errorMsg);
    } else if (unitError) {
      return res.send(errorMsg);
    }

    result.returnNum = convertHandler.convert(result.initNum, result.initUnit);
    result.returnUnit = convertHandler.getReturnUnit(result.initUnit);
    result.string = convertHandler.getString(
      result.initNum, result.initUnit,
      result.returnNum, result.returnUnit
    );

    res.send(result);
  });
};
