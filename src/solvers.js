/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({'n' : n});
  for ( var rowIndex = 0; rowIndex < n; rowIndex++ ) {
    board.get(rowIndex)[rowIndex] = 1;
    solution.push(board.get(rowIndex));
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;//fixme
  var solution = [];
  var lastHead = false;
  var searchNextRow = function(temp){
    var solution = temp.slice();
    if (solution.length === n) {
      solutionCount ++;
      // the following 2 lines of code are used for efficiency only; decrease running time about 50%
      if ((n > 1) && (!lastHead)) {
        solutionCount ++;
      }
    } else if (solution.length === 0) {
      for (var colIndexFirstRow = 0; colIndexFirstRow < Math.ceil(n/2); colIndexFirstRow ++) {
        solution[0] = [];
        solution[0][colIndexFirstRow] = 1;
        // the following 1 lines of code are used for efficiency only; decrease running time about 50%
        if (!(n % 2 === 0) && (colIndexFirstRow === Math.ceil(n/2) -1)) lastHead = true;
        searchNextRow(solution);
        solution.pop();
      }
    } else {
      for (var rowIndex = n - 1; rowIndex >= 0; rowIndex --) {
        if (Array.isArray(solution[rowIndex])) {
          for (var colIndex = 0; colIndex < n; colIndex ++) {
            for (var currRow = 0; currRow <= rowIndex ; currRow ++) {
              if (solution[currRow][colIndex] === 1) {
                break;
              }
            }
            if (currRow > rowIndex) {
              solution[rowIndex + 1] = [];
              solution[rowIndex + 1][colIndex] = 1;
              searchNextRow(solution);
              solution.pop();
            }
          }
          break;
        }
      }
    }
  }
  searchNextRow(solution);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var complete = false;
  var rowObj;

  var searchNextRow = function(temp){
    if (complete) return;
    //create a copy of the current solution-in-process.
    solution = temp.slice();
    if (solution.length === n) {
      //sets a flag to true if we have constructed a complete board
      complete = true;
      return;
    } else if (solution.length === 0) {
      //sets up each possibility for first row and calls searchNextRow recursively on each possibility
      for (var colIndexFirstRow = 0; colIndexFirstRow < n; colIndexFirstRow ++) {
        solution[0] = [];
        solution[0][colIndexFirstRow] = 1;
        rowObj = {0: colIndexFirstRow};
        searchNextRow(solution);
        if (complete) return;
        solution.pop();
      }
    } else {
      //finds the last inserted row of the board
      for (var rowIndex = n - 1; rowIndex >= 0; rowIndex --) {
        if (Array.isArray(solution[rowIndex])) {
          for (var colIndex = 0; colIndex < n; colIndex ++) {
            //check next row for a valid column for the next piece to add
            var valid = true;
            for (var currRow = 0; currRow <= rowIndex ; currRow ++) {
              //check for column conflict
              if (solution[currRow][colIndex] === 1) {
                valid = false;
                break;
              } else {
                //check for diagonal conflict
                for (var key in rowObj) {
                  if (Math.abs((rowIndex + 1 - Number(key))/(colIndex - rowObj[key])) === 1){
                    var valid = false;
                    break;
                  }
                }
              }
            }
            //adds the next piece in a valid column. If not valid, go back to colIndex for-loop.
            if (valid) {
              solution[rowIndex + 1] = [];
              solution[rowIndex + 1][colIndex] = 1;
              rowObj[rowIndex+1] = colIndex;
              //calls searchNextRow recursively on solution-in-process after the next row was inserted.
              searchNextRow(solution);
              if (complete) return;
              //if no solution could be found from the solution-in-process, delete the last row and
              //try the next position.
              solution.pop();
              delete rowObj[rowIndex+1];
            }
          }
          break;
        }
      }
    }
  }

  searchNextRow(solution);

  //if no solution could be found, return an nxn empty array of arrays.
  !complete && (solution = new Array(n));

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var rowObj = {0:0};
  var searchNextRow = function(temp){
    //create a copy of the solution-in-progress
    var solution = temp ? temp.slice() : [];
    if (solution.length === n) {
      solutionCount ++;
      // the following few lines of code are used for efficiency only; decrease running time about 50%
      var lastHead = n % 2 === 0 ? n/2 : (Math.ceil(n/2) - 1);
      if ((n > 1) && (rowObj[0] !== lastHead)) {
        solutionCount ++;
      }
    } else if (solution.length === 0) {
      //sets up each possibility for the first row and calls searchNextRow recursively on each option
      for (var colIndexFirstRow = 0; colIndexFirstRow < Math.ceil(n/2); colIndexFirstRow ++) {
        //loop through half of the columns (rounding up). Only half due to accounting for symmetric solutions.
        solution[0] = [];
        solution[0][colIndexFirstRow] = 1;
        rowObj = {0: colIndexFirstRow};
        searchNextRow(solution);
        solution.pop();
      }
    } else {
      //finds the last row that was added
      for (var rowIndex = n - 1; rowIndex >= 0; rowIndex --) {
        if (Array.isArray(solution[rowIndex])) {
          //search for the next valid column for a piece
          for (var colIndex = 0; colIndex < n; colIndex ++) {
            var valid = true;
            for (var currRow = 0; currRow <= rowIndex ; currRow ++) {
              //check for column conflicts
              if (solution[currRow][colIndex] === 1) {
                valid = false;
                break;
              } else {
                //check for diagonal conflicts
                for (var key in rowObj) {
                  if (Math.abs((rowIndex + 1 - Number(key))/(colIndex - rowObj[key])) === 1){
                    var valid = false;
                    break;
                  }
                }
              }
            }
            if (valid) {
              //adds a piece to the next valid spot and calls searchNextRow recursively on the new solution-in-progress
              solution[rowIndex + 1] = [];
              solution[rowIndex + 1][colIndex] = 1;
              rowObj[rowIndex+1] = colIndex;
              searchNextRow(solution);
              //if no valid solution could be found from the last board state, delete the last added row and go back to
              //the colIndex for-loop.
              solution.pop();
              delete rowObj[rowIndex+1];
            }
          }
          break;
        }
      }
    }
  }
  searchNextRow();

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



window.countNQueensBitwise = function(n){
  var solutionCount = 0;

  console.log('Bitwise: Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


