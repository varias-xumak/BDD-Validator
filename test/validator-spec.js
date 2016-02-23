var chai = require('chai'),
    expect = chai.expect,
    //should = chai.should(),
    validator = require('../lib/validator');

function expectedToIncludeErrorWhenInvalid(number, error) {
  it('like ' + number, function () {
    expect(validator(number)).to.include(error);
  });
}

describe('A validator', function() {
  
  it('will return no errors for valid numbers', function() {
    expect(validator(7)).to.be.empty;
  });

  describe('will include error.nonpositive for not strictly positive numbers:', function() {
    
    it('like 0', function() {
      //Good syntax
      expectedToIncludeErrorWhenInvalid(0, 'error.nonpositive');
      //Problematic syntax
      //validator(0).should.include('error.nonpositive');
    });

    it('like -2', function(){
      expectedToIncludeErrorWhenInvalid(-2, 'error.nonpositive');
    });
  
  });

  describe('will include error.three for divisible by 3 numbers:', function(){
  
    it('like 3', function() {
      expectedToIncludeErrorWhenInvalid(3, 'error.three');
    });

    it('like 6', function() {
      expectedToIncludeErrorWhenInvalid(6, 'error.three');
    });

    it('like 15', function() {
      expectedToIncludeErrorWhenInvalid(15, 'error.three');
    });
  
  });

  describe('will return error.five for divisible by 5 numbers:', function() {
  
    it('like 5', function() {
      expectedToIncludeErrorWhenInvalid(5, 'error.five');
    });
    
    it('like 10', function() {
      expectedToIncludeErrorWhenInvalid(10, 'error.five');
    });

    it('like 15', function() {
      expectedToIncludeErrorWhenInvalid(15, 'error.five');
    });
  
  });

});