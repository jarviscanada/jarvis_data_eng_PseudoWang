function solveSudoku(board: string[][]): void {
  if (!board || !board.length) return;

  solve(board);
}

function solve(board: string[][]): boolean {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === ".") {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, i, j, num.toString())) {
            board[i][j] = num.toString();
            // recursively solve
            if (solve(board)) {
              return true;
            } else {
              board[i][j] = ".";
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValid(board: string[][], row: number, col: number, num: string): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] !== "." && board[i][col] === num) return false;
    if (board[row][i] !== "." && board[row][i] === num) return false;
    let subBoxStartRow = 3 * Math.floor(row / 3);
    let subBoxStartCol = 3 * Math.floor(col / 3);
    let subBoxCurrentRow = Math.floor(i / 3);
    let subBoxCurrentCol = i % 3;
    // check if 3x3 sub-box position is valid
    if (
      board[subBoxStartRow + subBoxCurrentRow][subBoxStartCol + subBoxCurrentCol] !== "." &&
      board[subBoxStartRow + subBoxCurrentRow][subBoxStartCol + subBoxCurrentCol] === num
    )
      return false;
  }
  return true;
}
