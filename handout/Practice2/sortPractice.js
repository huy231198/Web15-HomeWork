'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  for(let i = 0; i < input.length - 1; i++){
    for(let j = input.length - 1; j > i; j--){
      if(input[j] < input[j-1]){
        let t = input[j];
        input[j] = input[j - 1];
        input[j - 1] = t; 
      }
    }
  }
}

module.exports = sort
