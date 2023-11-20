// const value = require('./var');
// console.log(value);

const { odd, even } = require('./var'); // 구조 분해 할당

function checkOddOrEven(num) {
  if (num % 2) { // 홀수면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;