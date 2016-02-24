var chai = require('chai'),
    expect = chai.expect,
    factoryWithConfiguration = require('../lib/factory');

//Define a feature
describe('A validator', function() {

  var validator, configuration;

  //Define a scenario
  context('using the default validation rules:', function(){
    // beforeEach executes on each test (it), but before executes once on the complete set of tests.
    beforeEach(function () {
      configuration = function() {
        configuration.callCount++;
        configuration.args = Array.prototype.slice.call(arguments);
        return [
          {type: 'nonPositive'},
          {type: 'nonDivisible', options: {divisor: 3, error: 'error.three'}},
          {type: 'nonDivisible', options: {divisor: 5, error: 'error.five'}}
        ];
      };
      configuration.callCount = 0;
      var newValidator = factoryWithConfiguration(configuration);
      validator = newValidator('default');
    });

    //Define a test or assertion
    it('will access the configuration to get the validation rules', function() {
      expect(configuration.callCount).to.be.equal(1);
      expect(configuration.args).to.be.deep.equal(['default']);
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
  context('using the alternative validation rules:', function() {
    beforeEach(function () {
      configuration = function () {
        configuration.callCount++;
        configuration.args = Array.prototype.slice.call(arguments);
        return [
          {type: 'nonPositive'},
          {type: 'nonDivisible', options: {divisor: 11, error: 'error.eleven'}}
        ];
      };
      configuration.callCount = 0;
      var newValidator = factoryWithConfiguration(configuration);
      validator = newValidator('alternative');
    });

    it('will access the configuration to get the validation rules', function() {
      expect(configuration.callCount).to.be.equal(1);
      expect(configuration.args).to.be.deep.equal(['alternative']);
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
    context('for numbers divisible by 11:', function(){
    
      //Define a test or assertion
      it('like 11, will include error.eleven', function() {
        expect(validator(11)).to.include('error.eleven');
      });

      //Define a test or assertion
      it('like 22, will include error.eleven', function() {
        expect(validator(22)).to.include( 'error.eleven');
      });
    
    });

  });

});