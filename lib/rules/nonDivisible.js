module.exports = function nonDivisibleValidationRule(divisor, error) {
  return function(n, result) {
    if(n % divisor === 0) {
      result.push(error);
    }
  };
};