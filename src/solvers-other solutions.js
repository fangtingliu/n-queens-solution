
//using object instead of arrays significantly increased the run time.

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;//fixme
  var row = {};
  var col = {};
  var searchNextRow = function(row, col){
    var newRow = JSON.parse(JSON.stringify(row));
    var newCol = JSON.parse(JSON.stringify(col));

    if (newRow.hasOwnProperty(n-1)) {
      solutionCount ++;
    } else if (!newRow.hasOwnProperty(0)) {
      for (var colIndexFirstRow = 0; colIndexFirstRow < n; colIndexFirstRow ++) {
        // var firstRow = JSON.parse(JSON.stringify(row));
        // var newColFirstRow = JSON.parse(JSON.stringify(col));
        var firstRow = {};
        var newColFirstRow = {};
        firstRow[0] = colIndexFirstRow;
        newColFirstRow[colIndexFirstRow] = 0;
        searchNextRow(firstRow, newColFirstRow);
      }
    } else {
      for (var rowIndex = n - 1; rowIndex >= 0; rowIndex --) {
        if (newRow.hasOwnProperty(rowIndex)) {
          for (var colIndex = 0; colIndex < n; colIndex ++) {
            if (!newCol.hasOwnProperty(colIndex)) {
              newRow[rowIndex + 1] = colIndex;
              newCol[colIndex] = rowIndex + 1;
              searchNextRow(newRow, newCol);
              delete newRow[rowIndex + 1];
              delete newCol[colIndex];
            }
          }
          break;
        }
      }
    }
  }
  searchNextRow(row, col);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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

  var next = function(board) {
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
        if ( nextIndex !== n ) return board;
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
    var result = build(next(board));
    if ( result === null ) break;
  }

  return count;
};

