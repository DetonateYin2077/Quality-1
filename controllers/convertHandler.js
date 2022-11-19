function ConvertHandler() {
  
  this.getNum = function(input) {
    if (input === '') return 1

    let result;
    let firstLetter = input.match(/[a-zA-z]/)
  
    // unvalidatedNum.length !== 0
    let validateNum = (unvalidatedNum) => {
      if (unvalidatedNum.match(/[0-9\.\/]/gi).length === unvalidatedNum.length) {
        if (unvalidatedNum[0] === '/' ||
        unvalidatedNum[unvalidatedNum.length - 1] === '/') {
          return "invalid number"
        }
  
        let nums = unvalidatedNum.split('/')
        if (nums.length <= 2) {
          for (let num of nums) {
            if (Number.isNaN(Number(num))) return 'invalid number'
          }
  
          if (nums.length === 2) return Number(nums[0]) / Number(nums[1])
          return Number(nums[0])
        } else {
          return 'invalid number'
        }
      } else {
        return 'invalid number'
      }
    }
  
    if (firstLetter) {
      let unvalidatedNum = input.slice(0, firstLetter.index)
      if (unvalidatedNum.length === 0) {
        result = 1
      } else {
        result = validateNum(unvalidatedNum)
      }
    } else {
      result = validateNum(input)
    }
  
    return result;
  };
  
  this.getUnit = function(input) {
    let firstLetter = input.match(/[a-zA-z]/)

    if (!firstLetter) return 'invalid unit'
    
    let unvalidatedUnit = input.slice(firstLetter.index, input.length)
    unvalidatedUnit = unvalidatedUnit.toLowerCase()

    switch(unvalidatedUnit) {
      case 'km':
        return 'km'
      case 'mi':
        return 'mi'
      case 'gal':
        return 'gal'
      case 'l':
        return 'L'
      case 'kg':
        return 'kg'
      case 'lbs':
        return 'lbs'
      default:
        return 'invalid unit'
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit) {
      case 'km':
        return 'mi'
      case 'mi':
        return 'km'
      case 'kg':
        return 'lbs'
      case 'lbs':
        return 'kg'
      case 'L':
        return 'gal'
      case 'gal':
        return 'L'
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit) {
      case 'km':
        return 'kilometers'
      case 'mi':
        return 'miles'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'
      case 'L':
        return 'liters'
      case 'gal':
        return 'gallons'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit) {
      case 'km':
        return Number((initNum / miToKm).toFixed(5))
      case 'mi':
        return Number((initNum * miToKm).toFixed(5))
      case 'gal':
        return Number((initNum * galToL).toFixed(5))
      case 'L':
        return Number((initNum / galToL).toFixed(5))
      case 'lbs':
        return Number((initNum * lbsToKg).toFixed(5))
      case 'kg':
        return Number((initNum / lbsToKg).toFixed(5))
    }
  };
}

module.exports = ConvertHandler;
