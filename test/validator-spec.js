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

//Define a feature
describe('A validator', function() {

  var validator;

  //Define a scenario
  context('using the default validation rules:', function(){
    // beforeEach executes on each test (it), but before executes once on the complete set of tests.
    beforeEach(function () {
      validator = validatorWith([
        nonPositiveValidationRule,
        nonDivisibleValidationRule(3, 'error.three'),
        nonDivisibleValidationRule(5, 'error.five')
      ]);
    });
  
    //Define a test or assertion
    it('for valid numbers, will return no errors', function() {
      expect(validator(7)).to.be.empty;
    });

    //Define a scenario
    context('for not strictly positive numbers:', function() {
      
      //Define a test or assertion
      it('like 0, will include error.nonpositive', function() {
        expect(validator(0)).to.include('error.nonpositive');
      });

      //Define a test or assertion
      it('like -2, will include error.nonpositive', function(){
        expect(validator(-2)).to.include( 'error.nonpositive');
      });
    
    });

    //Define a scenario
    context('for numbers divisible by 3:', function(){
    
      //Define a test or assertion
      it('like 3, will include error.three', function() {
        expect(validator(3)).to.include('error.three');
      });

      //Define a test or assertion
      it('like 15, will include error.three', function() {
        expect(validator(15)).to.include( 'error.three');
      });
    
    });

    //Define a scenario
    context('for numbers divisible by 5:', function() {
    
      //Define a test or assertion
      it('like 5, will return error.five', function() {
        expect(validator(5)).to.include('error.five');
      });
      
      //Define a test or assertion
      it('like 15, will return error.five', function() {
        expect(validator(15)).to.include( 'error.five');
      });
    
    });
  });

  //Define another scenario
  context('with other rules', function() {
    beforeEach(function () {
      validator = validatorWith([
        weirdRule(1),
        nonStandardRule
      ]);
    });

    //Other tests
  });

});