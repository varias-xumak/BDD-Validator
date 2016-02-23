var chai = require('chai'),
    expect = chai.expect,
    validatorWith = require('../lib/validator'),
    nonPositiveValidationRule = require('../lib/rules/nonPositive'),
    nonDivisibleValidationRule = require('../lib/rules/nonDivisible');

function expectedToIncludeErrorWhenInvalid(number, error) {
  it('like ' + number, function () {
    expect(validator(number)).to.include(error);
  
  });
}

describe('A validator', function() {
  
  it('will return no errors for valid numbers', function() {
    
    var validator = validatorWith([
      nonPositiveValidationRule,
      nonDivisibleValidationRule(3, 'error.three'),
      nonDivisibleValidationRule(5, 'error.five')
    ]);
    expect(validator(7)).to.be.empty;

  });

  describe('will include error.nonpositive for not strictly positive numbers:', function() {
    
    it('like 0', function() {
      
      var validator = validatorWith([
        nonPositiveValidationRule,
        nonDivisibleValidationRule(3, 'error.three'),
        nonDivisibleValidationRule(5, 'error.five')
      ]);
      expectedToIncludeErrorWhenInvalid(0, 'error.nonpositive');
      
    });

    it('like -2', function(){
      
      var validator = validatorWith([
        nonPositiveValidationRule,
        nonDivisibleValidationRule(3, 'error.three'),
        nonDivisibleValidationRule(5, 'error.five')
      ]);
      expectedToIncludeErrorWhenInvalid(-2, 'error.nonpositive');

    });
  
  });

  describe('will include error.three for divisible by 3 numbers:', function(){
  
    it('like 3', function() {

      var validator = validatorWith([
        nonPositiveValidationRule,
        nonDivisibleValidationRule(3, 'error.three'),
        nonDivisibleValidationRule(5, 'error.five')
      ]);
      expectedToIncludeErrorWhenInvalid(3, 'error.three');

    });

    it('like 15', function() {

      var validator = validatorWith([
        nonPositiveValidationRule,
        nonDivisibleValidationRule(3, 'error.three'),
        nonDivisibleValidationRule(5, 'error.five')
      ]);
      expectedToIncludeErrorWhenInvalid(15, 'error.three');

    });
  
  });

  describe('will return error.five for divisible by 5 numbers:', function() {
  
    it('like 5', function() {

      var validator = validatorWith([
        nonPositiveValidationRule,
        nonDivisibleValidationRule(3, 'error.three'),
        nonDivisibleValidationRule(5, 'error.five')
      ]);
      expectedToIncludeErrorWhenInvalid(5, 'error.five');

    });
    
    it('like 15', function() {

      var validator = validatorWith([
        nonPositiveValidationRule,
        nonDivisibleValidationRule(3, 'error.three'),
        nonDivisibleValidationRule(5, 'error.five')
      ]);
      expectedToIncludeErrorWhenInvalid(15, 'error.five');

    });
  
  });

});