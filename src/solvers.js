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
  var solution = [];
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
  var solutionCount = 0;
  var board = new Board({'n': n});

  // create a recursive function to place a piece to the first valid col in the next row
  var searchNextRow = function(rowIndex){

    // break the recursion when a valid board is found
    if (rowIndex === n) return solutionCount ++;

    // check validity of the column starting from left
    for (var colIndex = 0; colIndex < n; colIndex ++) {

      if (this.checkValidity(board.rows(), rowIndex - 1, colIndex)) {
        board.togglePiece(rowIndex, colIndex);
        searchNextRow(rowIndex + 1);
        
        // if the above branch is a dead end now; reset the board and storage object;
        board.togglePiece(rowIndex, colIndex);
      }
    }
  }

  searchNextRow(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solutionCount = 0;
  var rowObj = {};  // stores all the piece position as row:column
  var board = new Board({'n': n});

  // create a recursive function to place a piece to the first valid col in the next row
  var searchNextRow = function(rowIndex){
    // break the recursion and all loops when a valid board is found
    if (rowIndex === n) return solutionCount ++;
    if (solutionCount === 1) return;
    // check validity of the column starting from left
    for (var colIndex = 0; colIndex < n; colIndex ++) {

      if (this.checkValidity(board.rows(), rowIndex - 1, colIndex, rowObj)) {
        board.togglePiece(rowIndex, colIndex);
        rowObj[rowIndex] = colIndex;
        searchNextRow(rowIndex + 1);
        if (solutionCount === 1) return;
        // if the above branch is a dead end now; reset the board and storage object;
        board.togglePiece(rowIndex, colIndex);
        delete rowObj[rowIndex];
      }
    }
  }

  searchNextRow(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var rowObj = {};  // stores all the piece position as row:column
  var board = new Board({'n': n});

  // create a recursive function to place a piece to the first valid col in the next row
  var searchNextRow = function(rowIndex){

    // break the recursion when a valid board is found
    if (rowIndex === n) return solutionCount ++;

    // check validity of the column starting from left
    for (var colIndex = 0; colIndex < n; colIndex ++) {

      if (this.checkValidity(board.rows(), rowIndex - 1, colIndex, rowObj)) {
        board.togglePiece(rowIndex, colIndex);
        rowObj[rowIndex] = colIndex;
        searchNextRow(rowIndex + 1);
        
        // if the above branch is a dead end now; reset the board and storage object;
        board.togglePiece(rowIndex, colIndex);
        delete rowObj[rowIndex];
      }
    }
  }

  searchNextRow(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


window.checkValidity = function(solution, rowIndex, colIndex, rowObj) {
  var valid = true;
  if (rowIndex < 0) return true;
  for (var currRow = 0; currRow <= rowIndex ; currRow ++) {
    //check for column conflicts
    if (solution[currRow][colIndex] === 1) {
      valid = false;
      break;
    } else {
      //check for diagonal conflicts
      if ( rowObj !== undefined ) {

        for (var key in rowObj) {

          if (Math.abs((rowIndex + 1 - Number(key))/(colIndex - rowObj[key])) === 1){
            var valid = false;
            break;
          }
        }
      }
    }
  }
  return valid;
}

window.countNQueensBitwise = function(n){
  var solutionCount = 0;

  console.log('Bitwise: Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


