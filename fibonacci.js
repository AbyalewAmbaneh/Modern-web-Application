const fib_Of = function (number) {
  if (number <= 2) return 1;
  else {
    return fib_Of(number - 1) + fib_Of(number - 2);
  }
};
console.log("fib of 7 is: " + fib_Of(7));

//module.exports = fib_Of;
