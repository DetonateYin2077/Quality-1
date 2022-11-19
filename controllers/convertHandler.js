const LBS_TO_KG = 0.453592;
const MI_TO_KM = 1.60934;
const GAL_TO_L = 3.78541;

const UNITS = {
  kg: ["lbs", "pounds", num => num / LBS_TO_KG], lbs: ["kg", "kilograms", num => num * LBS_TO_KG],
  km: ["mi", "miles", num => num / MI_TO_KM], mi: ["km", "kilometers", num => num * MI_TO_KM],
  l: ["gal", "gallons", num => num / GAL_TO_L], gal: ["l", "liters", num => num * GAL_TO_L]
};

const ALPHA_REGEX = /[a-z]+/gi;

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.split(ALPHA_REGEX)[0];

    if (result === "") {
      return 1;
    }

    const potentialNum = +result;

    if (isNaN(potentialNum)) {
      result = result.split("/");

      if (result.length === 2) {
        let dividend = +result[0], divisor = +result[1];

        if (isNaN(dividend) || isNaN(divisor) || dividend <= 0 || divisor  <= 0) {
          throw new Error("invalid number");
        } else {
          return dividend / divisor;
        }
      } else {
        throw new Error("invalid number");
      }
    } else if (potentialNum <= 0) {
      throw new Error("invalid number");
    } else {
      return potentialNum;
    }
  };
  
  this.getUnit = function(input) {
    let result = input.match(ALPHA_REGEX);

    if (result === null) {
      throw new Error("invalid unit");
    }

    result = result[0].toLowerCase();
    if (typeof UNITS[result] === "undefined") {
      throw new Error("invalid unit");
    }

    return result === "l" ? "L" : result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const result = UNITS[initUnit.toLowerCase()][0];

    return result === "l" ? "L" : result;
  };

  this.spellOutUnit = function(unit) {
    return UNITS[this.getReturnUnit(unit).toLowerCase()][1];
  };
  
  this.convert = function(initNum, initUnit) {
    return parseFloat(UNITS[initUnit.toLowerCase()][2](initNum).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
