/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/
*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a first column pieces solution

window.buildNaiveSolution = function(n) {
  var solution = [];

  for (var i = 0; i < n; i ++) {
    var row = Array(n);
    row[0] = 1;
    solution.push(row);
  }
  return solution;
}

window.buildNextSolution = function(solution) {
  var n = solution.length;

  for ( var rowIndex = n-1; rowIndex >= 0; rowIndex-- ) {
    var colIndex = solution[rowIndex].indexOf(1);
    if ( colIndex === n-1 ) {
      solution[rowIndex][0] = 1;
      solution[rowIndex][colIndex] = 0;
    } else {
      solution[rowIndex][colIndex+1] = 1;
      solution[rowIndex][colIndex] = 0;
      return solution;
    }
  }
};

window.solutionToBoard = function (solution) {

}


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n, solution) {
  // check if solution is provided
  if (solution === undefined) {
    // if not, build a first column queens solution
    solution = this.buildNaiveSolution(n);
  }
  solution = this.buildNextSolution(solution);  // if yes, build the next solution



  // convert solution to a board

  // check board for conflicts

    // if passes, return solution

    // if failed, call findNRookSolution on newly built solution

  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.countNQueensBitwise = function(n){
  var solutionCount = 0;

  console.log('Bitwise: Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
