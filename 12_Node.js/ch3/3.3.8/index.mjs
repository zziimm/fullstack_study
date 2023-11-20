import  checkOddOrEven  from "./func.mjs";
import { odd, even } from "./var.mjs";

function checkStringOddOfEven(str) {
  if (str.length % 2) { // 홀수면
    return odd;
  }
  return even;
}

console.log(checkOddOrEven(10));
console.log(checkStringOddOfEven('hello'));