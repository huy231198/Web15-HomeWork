'use strict'

function search(input, target) {
  // return  input.indexOf(target);  // Remove this line and change to your own algorithm
  for (let i = 0; i < input.length; i++) {
    if (input[i] >= 10000 || input[i] <= -10000) {
      break;
    }
    if (input[i] >= input[i + 1]) {
      break;
    }
    if (input[i] == target)
      return i + 1;
  }
  return -1;
}

module.exports = search
