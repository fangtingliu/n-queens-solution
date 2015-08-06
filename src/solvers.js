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


window.countNRooksSolutions = function(n) {
  var count = 1;
  var colObj = {};
  var board = this.findNRooksSolution(n);

  for ( var i = 0; i < n; i++ ) {
    for ( var j = 0; j < n; j++ ) {
      if ( board[i][j] === 1 ) {
        colObj[j] = i;
      }
    }
  }

  var search = function(board) {
    for ( var row = n-1; row >= 0; row-- ) {
      var pieceIndex = board[row].indexOf(1);
      if ( pieceIndex < n-1 && pieceIndex > -1 ) {
        board[row][pieceIndex] = 0;
        delete colObj[pieceIndex];
        for ( var nextIndex = pieceIndex + 1; nextIndex < n; nextIndex++ ) {
          if ( !colObj.hasOwnProperty(nextIndex) ) {
            board[row][nextIndex] = 1;
            colObj[nextIndex] = row;
            break;
          }
        }
        return board;
      } else if ( pieceIndex === n - 1 ) {
        board[row][pieceIndex] = 0;
        delete colObj[pieceIndex];
      }
    }
    return null;
  }

  var build = function(board) {
    if ( board === null ) {
      return null;
    }
    for ( var row = 1; row < n; row++ ) {
      if ( board[row].indexOf(1) < 0 ) {
        for ( var col = 0; col < n; col++ ) {
          if ( !colObj.hasOwnProperty(col) ) {
            board[row][col] = 1;
            colObj[col] = row;
            break;
          }
        }
      }
    }
    count++;
    return board;
  };

  while ( true ) {
    var result = build(search(board));
    if ( result === null ) break;
  }

  return count;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
  // var solutionCount = 0;//fixme
  // var row = {};
  // var col = {};
  // var searchNextRow = function(row, col){
  //   if (row.hasOwnProperty(n-1)) {
  //     solutionCount ++;
  //   } else if (!row.hasOwnProperty(0)) {
  //     for (var colIndexFirstRow = 0; colIndexFirstRow < n; colIndexFirstRow ++) {
  //       var firstRow = JSON.parse(JSON.stringify(row));
  //       var newColFirstRow = JSON.parse(JSON.stringify(col));
  //       firstRow[0] = colIndexFirstRow;
  //       newColFirstRow[colIndexFirstRow] = 0;

  //       searchNextRow(firstRow, newColFirstRow);
  //     }
  //   } else {
  //     var newRow = JSON.parse(JSON.stringify(row));
  //     var newCol = JSON.parse(JSON.stringify(col));
  //     for (var rowIndex = n - 1; rowIndex >= 0; rowIndex --) {
  //       if (newRow.hasOwnProperty(rowIndex)) {
  //         for (var colIndex = 0; colIndex < n; colIndex ++) {
  //           if (!newCol.hasOwnProperty(colIndex)) {
  //             newRow[rowIndex + 1] = colIndex;
  //             newCol[colIndex] = rowIndex + 1;
  //             searchNextRow(newRow, newCol);
  //           }
  //         }
  //         break;
  //       }
  //     }
  //   }
  // }
  // searchNextRow(row, col);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
// };



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


